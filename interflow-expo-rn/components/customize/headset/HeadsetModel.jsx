import { View, Text } from 'react-native'
import React from 'react'
import { useGLTF } from "@react-three/drei/native";


export default function HeadsetModel(props) {
    const { nodes, materials } = useGLTF(require("./headsetsolo.glb"));

    return (
        <group {...props} dispose={null}>
            <group  rotation={[0, 0, 0]}>
                <mesh
                    geometry={nodes.Torus003.geometry}
                    material={materials["Material.014"]}
                    position={[0.31, 17.12, 1.21]}
                    rotation={[-1.58, 0, 0]}
                    scale={0.68}
                />
                <mesh
                    geometry={nodes.Torus002.geometry}
                    material={materials["Material.013"]}
                    position={[0.31, 17.12, 2.04]}
                    rotation={[-1.58, 0, 0]}
                    scale={0.35}
                />
                <mesh
                    geometry={nodes.Sphere003.geometry}
                    material={materials["Material.017"]}
                    position={[0.31, 18.12, 1.71]}
                    scale={-0.05}
                />
                <mesh
                    geometry={nodes.Sphere002.geometry}
                    material={materials["Material.016"]}
                    position={[1.84, 16.37, 1.01]}
                    scale={-0.06}
                />
                <mesh
                    geometry={nodes.Cylinder005.geometry}
                    material={materials["Material.022"]}
                    position={[0.31, 17.12, 2.07]}
                    rotation={[1.58, 0, 0]}
                    scale={[-0.29, -0.06, -0.29]}
                />
                <mesh
                    geometry={nodes.Cylinder004.geometry}
                    material={materials["Material.021"]}
                    position={[0.31, 17.84, 1.71]}
                    scale={[0.04, 0.24, 0.04]}
                />
                <mesh
                    geometry={nodes.Cone001.geometry}
                    material={materials["Material.023"]}
                    position={[0.31, 17.1, 2.03]}
                    rotation={[1.57, 0, 0]}
                    scale={0.78}
                />
                <mesh
                    geometry={nodes.BezierCurve002.geometry}
                    material={materials["Material.019"]}
                    position={[1.28, 16.56, 1.79]}
                    rotation={[-3.14, -0.02, -2.81]}
                    scale={0.78}
                />
            </group>
        </group>
    )
}