    import React, { useRef } from "react";
    import { useGLTF } from "@react-three/drei/native";
    // import { useFrame } from "@react-three/fiber/native";

export default function SneakersModel(props) {
  const { nodes ,materials } = useGLTF(require("../models/test.glb"));


  return (
    <group {...props} dispose={null}>
    <mesh
      castShadow
      receiveShadow
      geometry={nodes.Box.geometry}
      material={materials.Melbourne}
      rotation={[-Math.PI / 2, 0, 0]}
      scale={0}
    />
  </group>
  );
}


