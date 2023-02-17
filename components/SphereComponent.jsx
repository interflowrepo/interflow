import { View, Text, Alert } from "react-native";
import React from "react";
import GlassesIcon from "./GlassesIcon";

export default function SphereComponent({ onPress }) {
  return (
    <group
      position={[2.7, 3, 0]}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPress("glasses");
      }}
    >
      <GlassesIcon scale={0.005} position={[0, 0, 0]} animated />
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
