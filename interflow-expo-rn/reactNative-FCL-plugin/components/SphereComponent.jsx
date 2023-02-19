import { View, Text, Alert } from "react-native";
import React from "react";
import GlassesIcon from "./GlassesIcon";
import NativeAvatar from "./NativeAvatar";

export default function SphereComponent({ onPress, position, type }) {
  return (
    <group
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPress(type);
      }}
    >
      {type == "accesories" ? (
        <GlassesIcon scale={0.005} position={[0, 0, 0]} animated />
      ) : (
        <NativeAvatar scale={1} position={[0, -0.4, 0]} icon animated />
      )}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
