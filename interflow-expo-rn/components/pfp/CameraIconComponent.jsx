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
      <group position={[0, 0, 0.02]} rotation={[-Math.PI / 2, 0, 0]} scale={0.5}>
        <group position={[0, -20.24, 25.99]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.sensor.geometry}
            material={materials.sensor}
            position={[0, 40, -25.99]}
          />
        </group>
        <group position={[-20, 37.18, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder.geometry}
            material={materials.trigger}
            position={[-50, 18.72, 17.42]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </group>
        <group position={[0, -39.31, 50.31]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Box_6.geometry}
            material={materials.Glass}
            position={[58.42, 43.67, -21.82]}
            rotation={[Math.PI / 2, 0, -Math.PI]}
            scale={[-0.27, 0.02, 0.17]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_7.geometry}
            material={materials.glass}
            position={[0, 0, 6.76]}
            scale={1.14}
          />
        </group>
        <group position={[0, 21.14, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.lens_btn.geometry}
            material={materials["lens btn"]}
            position={[38.11, -40.54, 23.71]}
            scale={[0.55, 0.55, 1]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.body_top.geometry}
            material={materials["Camera Top"]}
            position={[0, -1.37, 86.44]}
          />
        </group>
        <group position={[0, -2.75, 87.13]} scale={1.14}>
          <mesh
            castShadow
            receiveShadow
            geometry={
              nodes["Cylinder_4_&_Cylinder_6_&_Cylinder_5_&_Torus"].geometry
            }
            material={materials["lens body"]}
            position={[0, 16.15, -32.36]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
        <group position={[0, -2.75, 87.13]} scale={1.14}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_4.geometry}
            material={materials.lens}
            position={[0, 16.15, -32.36]}
            rotation={[Math.PI / 2, 0, 0]}
          />
        </group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Body.geometry}
          material={materials.Dallas}
          position={[0, 19.76, 0]}
        />
      </group>
    </group>
  );
}

// useGLTF.preload(require("../models/glasses.gltf"));
