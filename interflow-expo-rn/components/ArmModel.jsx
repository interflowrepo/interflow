import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";

export default function ArmModel(props) {
  const { nodes } = useGLTF(require("../models/chicinterseparada.glb"));
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_7.geometry}
        // material={materials["Plastic (7)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_0.geometry}
        // material={materials["Plastic (1)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_1.geometry}
        // material={materials["Plastic (1)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_2.geometry}
        // material={materials["Plastic (9)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_3.geometry}
        // material={materials["Plastic (7)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_4.geometry}
        // material={materials["Plastic (6)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_6.geometry}
        // material={materials["Plastic (8)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_9.geometry}
        // material={materials["Plastic (1)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_10.geometry}
        // material={materials.Plastic}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_11.geometry}
        // material={materials["Plastic (3)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_12.geometry}
        // material={materials["Plastic (3)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_13.geometry}
        // material={materials["Plastic (1)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_14.geometry}
        // material={materials["Plastic (4)"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_16.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_17.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_19.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_20.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_21.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_23.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_24.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8_2.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8_3.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_1.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8_4.geometry}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8_5.geometry}
      />
      
    </group>
  );
}
