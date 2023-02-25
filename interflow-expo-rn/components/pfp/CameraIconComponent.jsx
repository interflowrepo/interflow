import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";

export default function CameraIconComponent(props) {
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (props.animated) ref.current.rotation.y = Math.sin(t / 2);
  });

  const { nodes, materials } = useGLTF(require("../../models/cam.glb"));
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh"].geometry}
        material={materials.mat15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_1"].geometry}
        material={materials.mat23}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_2"].geometry}
        material={materials.mat25}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_3"].geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_4"].geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Node-Mesh_5"].geometry}
        material={materials.mat22}
      />
    </group>
  );
}

// useGLTF.preload(require("../models/glasses.gltf"));
