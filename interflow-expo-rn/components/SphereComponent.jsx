import { View, Text, Alert } from "react-native";
import React from "react";
import GlassesIcon from "./GlassesIcon";
import NativeAvatar from "./NativeAvatar";
import CameraIconComponent from "./pfp/CameraIconComponent";

export default function SphereComponent({ onPress, position, type }) {

  function CameraIcon() {
    return (
      <mesh scale={0.6} position={[0, 0, 0]} rotation={[0.1,0,0]}>
        {/* Lens */}
        <mesh position={[0, 0, 0.7]} rotation={[Math.PI / 2,0,0]} >
          <cylinderGeometry args={[0.25, 0.25, 0.5, 32]} />
          <meshStandardMaterial color="lightgreen" />
        </mesh>
        {/* Body */}
        <mesh>
          <boxGeometry args={[1.3, 1, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
        {/* Viewfinder */}
        <mesh position={[0, 0.5, 0.5]}>
          <boxGeometry args={[0.3, 0.25, 0.25]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </mesh>
    );
  }

  return (
    <group
      position={position}
      onPointerDown={(e) => {
        e.stopPropagation();
        onPress(type);
      }}
    >
      {type == "accesories" && (
        <GlassesIcon scale={0.005} position={[0, 0, 0]} animated />
      )}

      {type == "outfit" && (
        <NativeAvatar scale={1} position={[0, -0.4, 0]} icon animated />
      )}

      {type == "camera" && (
        <group>
          <CameraIcon />
        </group>
        // <CameraIconComponent scale={1} position={[0, 0, 0]} animated />
      )}

      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
