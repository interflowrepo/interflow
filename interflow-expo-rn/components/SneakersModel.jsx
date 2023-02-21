    import React, { useRef } from "react";
    import { useGLTF } from "@react-three/drei/native";
    // import { useFrame } from "@react-three/fiber/native";

export default function SneakersModel(props) {
  const { nodes ,materials } = useGLTF(require("../models/sneakers.glb"));


  return (
    <group {...props} dispose={null}>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={2.45}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Blue_mattte.geometry}
        material={materials["Blue mattte"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turquoise.geometry}
        material={materials.Turquoise}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Green.geometry}
        material={materials.Green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.White.geometry}
        material={materials.White}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Purple.geometry}
        material={materials.Purple}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Blue.geometry}
        material={materials.Blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dark_Purple.geometry}
        material={materials["Dark Purple"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Orange.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Yellow.geometry}
        material={materials.Yellow}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LIght_blue.geometry}
        material={materials["LIght blue"]}
      />
    </group>
    <group rotation={[-Math.PI / 2, 0, 0]} scale={2.45}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bluematte.geometry}
        material={materials["Blue mattte"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Turquoise_1.geometry}
        material={materials.Turquoise}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Green_1.geometry}
        material={materials.Green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.White_1.geometry}
        material={materials.White}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Purple_1.geometry}
        material={materials.Purple}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Blue_1.geometry}
        material={materials.Blue}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Dark_Purple_1.geometry}
        material={materials["Dark Purple"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Orange_1.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Yellow_1.geometry}
        material={materials.Yellow}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Black_1.geometry}
        material={materials.Black}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LIght_blue_1.geometry}
        material={materials["LIght blue"]}
      />
    </group>
  </group>
  );
}


