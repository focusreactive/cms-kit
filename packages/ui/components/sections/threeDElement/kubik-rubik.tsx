"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Colors for the cube faces
const CUBE_COLORS = {
  white: "#FFFFFF",
  yellow: "#FFFF00",
  red: "#FF0000",
  orange: "#FFA500",
  blue: "#0000FF",
  green: "#00FF00",
};

// Material for cube faces with subtle shading
const createFaceMaterial = (color: string) => {
  return new THREE.MeshStandardMaterial({
    color,
    metalness: 0,
    roughness: 0.2,
    side: THREE.DoubleSide,
    emissive: color,
    emissiveIntensity: 0.2,
  });
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

interface CubeletProps {
  position: [number, number, number];
  colors: [string, string, string, string, string, string];
}

const Cubelet: React.FC<CubeletProps> = ({ position, colors }) => {
  const meshRef = useRef<THREE.Group>(null!);
  const size = 0.95; // Slightly smaller than 1 to create gaps

  return (
    <group ref={meshRef} position={position}>
      {/* Front face */}
      <mesh position={[0, 0, size / 2]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[0])} />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -size / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[1])} />
      </mesh>
      {/* Right face */}
      <mesh position={[size / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[2])} />
      </mesh>
      {/* Left face */}
      <mesh position={[-size / 2, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[3])} />
      </mesh>
      {/* Top face */}
      <mesh position={[0, size / 2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[4])} />
      </mesh>
      {/* Bottom face */}
      <mesh position={[0, -size / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[size, size]} />
        <meshStandardMaterial {...createFaceMaterial(colors[5])} />
      </mesh>
    </group>
  );
};

const RubiksCube = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const [cubelets] = useState(() => {
    const cubes = [];
    const { white, yellow, red, orange, blue, green } = CUBE_COLORS;

    // Create 27 cubelets (3x3x3)
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const colors: [string, string, string, string, string, string] = [
            z === 1 ? red : "#222", // Front
            z === -1 ? orange : "#222", // Back
            x === 1 ? blue : "#222", // Right
            x === -1 ? green : "#222", // Left
            y === 1 ? white : "#222", // Top
            y === -1 ? yellow : "#222", // Bottom
          ];

          cubes.push({
            position: [x, y, z] as [number, number, number],
            colors,
          });
        }
      }
    }
    return cubes;
  });

  useFrame(() => {
    if (groupRef.current) {
      // Add subtle automatic rotation
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {cubelets.map((props, index) => (
        <Cubelet key={index} {...props} />
      ))}
    </group>
  );
};

export default function KubikRubikModel() {
  return (
    <div className="h-[600px]">
      <Canvas
        camera={{
          position: [4, 4, 4],
          fov: 50,
        }}
        gl={{ alpha: true }}
      >
        <CameraController />
        <ambientLight intensity={1.1} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <RubiksCube />
      </Canvas>
    </div>
  );
}
