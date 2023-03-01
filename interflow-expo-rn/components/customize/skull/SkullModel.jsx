import { View, Text } from 'react-native'
import React from 'react'
import { useGLTF } from "@react-three/drei/native";


export default function SkullModel(props) {
    const { nodes, materials } = useGLTF(require("./smokepipe.glb"));

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_0.geometry}
                material={materials["Material.002"]}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_1.geometry}
                material={materials["Material.001"]}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_2.geometry}
                material={materials.Material1}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_3.geometry}
                material={materials.Material}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_4.geometry}
                material={materials["Material.001"]}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_1001.geometry}
                material={materials.Material1}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_1002.geometry}
                material={materials["Material.001"]}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_1003.geometry}
                material={materials.Material1}
                rotation={[0, 1.27, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.kaedim_mesh_4001.geometry}
                material={materials["Material.001"]}
                rotation={[0, 1.27, 0]}
            />
        </group>
    )
}