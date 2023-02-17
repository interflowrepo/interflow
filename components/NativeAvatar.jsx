import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei/native";
import GlassesIcon from "./GlassesIcon";

export default function AvatarComponent(props) {
  const { nodes  } = useGLTF(require("../models/kira.glb"));
  return (
    <group {...props} dispose={null}>
      <GlassesIcon scale={0.002} position={[-0.05,0.76,0.13]} rotation={[0, -0.5,0]} animated={false} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_0.geometry}
        // material={nodes.kaedim_mesh_0.material}
      >
        {/* <meshBasicMaterial color="black" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_1.geometry}
        material={nodes.kaedim_mesh_1.material}
      >
        {/* <meshBasicMaterial color="black" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_2.geometry}
        material={nodes.kaedim_mesh_2.material}
      >
        {/* left show base
                        <meshBasicMaterial color="indigo" /> */}

      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_3.geometry}
        material={nodes.kaedim_mesh_3.material}
      >
        {/* short */}
        <meshBasicMaterial color="#FFE780" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_4.geometry}
        material={nodes.kaedim_mesh_4.material}
      >
        {/* LEFT shoulderpad */}
        <meshBasicMaterial color="#8080D9" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_5.geometry}
        material={nodes.kaedim_mesh_5.material}
      >
        {/* left glove */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_6.geometry}
        material={nodes.kaedim_mesh_6.material}
      >
        {/* left sock */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_7.geometry}
        material={nodes.kaedim_mesh_7.material}
      >
        {/* t shirt */}
        <meshBasicMaterial color={props.shirtColor} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_8.geometry}
        material={nodes.kaedim_mesh_8.material}
      >
        {/* skin*/}
        <meshBasicMaterial color="#EFC5D8" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_9.geometry}
        material={nodes.kaedim_mesh_9.material}
      >
        {/* left eye */}
                        {/* <meshBasicMaterial color="black" /> */}

      </mesh>

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_10.geometry}
        material={nodes.kaedim_mesh_10.material}
      >
        <meshBasicMaterial color="#4BC98D" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_11.geometry}
        material={nodes.kaedim_mesh_11.material}
      >
        {/* hair */}
        <meshBasicMaterial color="#545485" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_12.geometry}
        material={nodes.kaedim_mesh_12.material}
      >
        {/* left eyebrow */}
        {/* <meshBasicMaterial color="black" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_13.geometry}
        material={nodes.kaedim_mesh_13.material}
      >
        <meshBasicMaterial color="indigo" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_14.geometry}
        material={nodes.kaedim_mesh_14.material}
      >
        <meshBasicMaterial color="indigo" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_15.geometry}
        material={nodes.kaedim_mesh_15.material}
      >
        {/* show front */}
        {/* <meshBasicMaterial color="indigo" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_16.geometry}
        material={nodes.kaedim_mesh_16.material}
      >
        {/* left shoe base */}
        {/* <meshBasicMaterial color="indigo" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_17.geometry}
        material={nodes.kaedim_mesh_17.material}
      >
        {/* shoe top */}
        <meshBasicMaterial color="indigo" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_18.geometry}
        material={nodes.kaedim_mesh_18.material}
      >
        {/* right shoe top */}
        {/* <meshBasicMaterial color="indigo" /> */}
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_19.geometry}
        material={nodes.kaedim_mesh_19.material}
      >
        {/* left shoulder pad */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_20.geometry}
        material={nodes.kaedim_mesh_20.material}
      >
        {/* right shoulder pad */}

        <meshBasicMaterial color="#8080D9" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_21.geometry}
        material={nodes.kaedim_mesh_21.material}
      >
        {/* left shoulder pad */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_22.geometry}
        material={nodes.kaedim_mesh_22.material}
      >
        {/* right glove */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_23.geometry}
        material={nodes.kaedim_mesh_23.material}
      >
        {/* right sock */}
        <meshBasicMaterial color="#A4A4F4" />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.kaedim_mesh_24.geometry}
        material={nodes.kaedim_mesh_24.material}
      >
        {/* // right eye */}
        {/* <meshBasicMaterial color="black" /> */}
      </mesh>
    </group>
  );
}

// useGLTF.preload("/file.glb");
