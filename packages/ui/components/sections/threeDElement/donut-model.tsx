"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GlazeMaterial = {
  uniforms: {
    time: { value: 0 },
    colorA: { value: new THREE.Color("#4158D0") },
    colorB: { value: new THREE.Color("#C850C0") },
    colorC: { value: new THREE.Color("#FFCC70") },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    uniform vec3 colorC;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      float noise = sin(vUv.x * 10.0 + time) * sin(vUv.y * 10.0 + time) * 0.1;
      
      vec3 color1 = mix(colorA, colorB, vUv.x);
      vec3 color2 = mix(color1, colorC, vUv.y);
      
      gl_FragColor = vec4(color2 + noise, 1.0);
    }
  `,
};

function CameraController() {
  const { camera, gl } = useThree();
  const rotationSpeed = 0.005;

  useEffect(() => {
    const canvas = gl.domElement;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y,
      };

      const rotationQuaternion = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(
          deltaMove.y * rotationSpeed,
          deltaMove.x * rotationSpeed,
          0,
          "XYZ",
        ),
      );

      camera.position.applyQuaternion(rotationQuaternion);
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [camera, gl, rotationSpeed]);

  return null;
}

const Donut = ({ count = 2000, radius = 5, tubeRadius = 2 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const glazeRef = useRef<THREE.Mesh>(null!);
  const sprinklesRef = useRef<THREE.InstancedMesh>(null!);
  const { raycaster, mouse, camera } = useThree();

  const [particlesPosition, sprinklesPosition] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sprinklesPos = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = radius + tubeRadius * Math.cos(phi);
      const x = r * Math.cos(theta);
      const y = r * Math.sin(theta);
      const z = tubeRadius * Math.sin(phi);
      positions.set([x, y, z], i * 3);

      if (z > 0) {
        const sprinkleR = radius + tubeRadius * 1.05 * Math.cos(phi);
        sprinklesPos.set(
          [
            sprinkleR * Math.cos(theta),
            sprinkleR * Math.sin(theta),
            tubeRadius * 1.05 * Math.sin(phi),
          ],
          i * 3,
        );

        colors.set(
          [
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
            Math.random() * 0.5 + 0.5,
          ],
          i * 3,
        );
      }
    }
    return [positions, sprinklesPos] as const;
  }, [count, radius, tubeRadius]);

  useFrame((state) => {
    if (meshRef.current && glazeRef.current && sprinklesRef.current) {
      const material = glazeRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.getElapsedTime();
      }

      raycaster.setFromCamera(mouse, camera);
      const intersection = raycaster.intersectObject(glazeRef.current);

      const tempObject = new THREE.Object3D();
      const tempSprinkle = new THREE.Object3D();

      for (let i = 0; i < count; i++) {
        tempObject.position.fromArray(particlesPosition, i * 3);

        if (intersection?.[0]?.point) {
          const point = intersection[0].point;
          const distance = tempObject.position.distanceTo(point);
          if (distance < 1) {
            const direction = tempObject.position.sub(point).normalize();
            tempObject.position.add(direction.multiplyScalar(0.2));
          }
        }

        tempObject.updateMatrix();
        meshRef.current.setMatrixAt(i, tempObject.matrix);

        // Handle sprinkles separately
        const sprinkleZ = sprinklesPosition?.[i * 3 + 2];
        if (sprinkleZ !== undefined && sprinkleZ > 0) {
          tempSprinkle.position.fromArray(sprinklesPosition, i * 3);
          tempSprinkle.updateMatrix();
          sprinklesRef.current.setMatrixAt(i, tempSprinkle.matrix);
        }
      }

      meshRef.current.instanceMatrix.needsUpdate = true;
      sprinklesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </instancedMesh>
      <mesh ref={glazeRef}>
        <torusGeometry args={[radius, tubeRadius, 32, 100]} />
        <shaderMaterial args={[GlazeMaterial]} />
      </mesh>
      <instancedMesh ref={sprinklesRef} args={[undefined, undefined, count]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial vertexColors />
      </instancedMesh>
    </group>
  );
};

export default function DonutModel() {
  return (
    <div className="h-[600px]">
      <Canvas
        camera={{
          position: [0, 0, 15],
          fov: 55,
        }}
        gl={{ alpha: true }}
      >
        <CameraController />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Donut />
      </Canvas>
    </div>
  );
}
