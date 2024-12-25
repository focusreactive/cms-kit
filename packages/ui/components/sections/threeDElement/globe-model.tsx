"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GlobeMaterial = {
  uniforms: {
    time: { value: 0 },
    colorA: { value: new THREE.Color("#1E4D7B") }, // Deep blue
    colorB: { value: new THREE.Color("#4CB5F5") }, // Light blue
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 colorA;
    uniform vec3 colorB;
    varying vec2 vUv;
    varying vec3 vNormal;
    
    void main() {
      float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
      vec3 color = mix(colorA, colorB, fresnel + sin(vUv.y * 20.0 + time) * 0.1);
      gl_FragColor = vec4(color, 1.0);
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

const Globe = ({ radius = 8 }) => {
  const globeRef = useRef<THREE.Mesh>(null!);
  const atmosphereRef = useRef<THREE.Mesh>(null!);

  // Grid points for the globe surface
  const pointsGeometry = new THREE.BufferGeometry();
  const pointsCount = 2000;
  const positions = new Float32Array(pointsCount * 3);

  // Create grid points positions
  for (let i = 0; i < pointsCount; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    positions.set([x, y, z], i * 3);
  }

  pointsGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3),
  );

  useFrame((state) => {
    if (globeRef.current && atmosphereRef.current) {
      // Rotate the globe slowly
      globeRef.current.rotation.y += 0.001;
      atmosphereRef.current.rotation.y += 0.001;

      // Update shader time
      const material = globeRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms?.time) {
        material.uniforms.time.value = state.clock.getElapsedTime();
      }
    }
  });

  return (
    <group>
      {/* Main Globe */}
      <mesh ref={globeRef}>
        <sphereGeometry args={[radius, 64, 64]} />
        <shaderMaterial args={[GlobeMaterial]} />
      </mesh>

      {/* Atmosphere layer */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[radius * 1.1, 64, 64]} />
        <meshBasicMaterial color="#4CB5F5" transparent={true} opacity={0.1} />
      </mesh>

      {/* Grid points */}
      <points geometry={pointsGeometry}>
        <pointsMaterial
          size={0.05}
          color="#ffffff"
          transparent={true}
          opacity={0.6}
        />
      </points>
    </group>
  );
};

export default function GlobeModel() {
  return (
    <div className="h-[600px]">
      <Canvas
        camera={{
          position: [0, 0, 20],
          fov: 60,
        }}
        gl={{ alpha: true }}
      >
        <CameraController />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Globe />
      </Canvas>
    </div>
  );
}
