/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import { useFrame } from "@react-three/fiber/native";



export default function GlassesIcon(props) {
  const ref = useRef();


  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t / 2);
    ref.current.rotation.x = Math.sin(t / 2);
  });

  const { nodes, materials } = useGLTF(require("../models/deal.glb"));


  console.log("nodes", nodes)

  return (
    <group {...props} dispose={null}>
    {/* <group rotation={[-Math.PI / 2, 0, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.black_mesh_black_0.geometry}
          material={materials.black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.white_mesh_white_0.geometry}
          material={materials.white}
        />
      </group>
    </group> */}
  </group>
  );
}

// useGLTF.preload(require("../models/glasses.gltf"));
