import { View, Text, Alert, Dimensions } from "react-native";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber/native";
import {
  Environment,
  Caustics,
  PerspectiveCamera,
  Stage,
  useFrame,
  Image,
  Backdrop,
} from "@react-three/drei/native";
import NativeAvatar from "./NativeAvatar";
import GlassesIcon from "./GlassesIcon";
export default function SphereActionsComponent() {
  // function that returns a sphere with the geometry and material provided


  const dimensions = Dimensions.get("window");
  const width = dimensions.width;
  const height = dimensions.height;

  return (
    <View style={{ height: "100%", width: "100%" }}>
      <Canvas style={{ height, width: 400 }}>
          <Backdrop
          floor={0.6} // Stretches the floor segment, 0.25 by default
          segments={100} // Mesh-resolution, 20 by default
          args={[1000, 500]}
          position={[0, -6, -12]}
          scale={[30, 50, 16]}
        >
          <meshStandardMaterial color="#353540" />
        </Backdrop>
        
        <Stage intensity={0.1} contactShadowOpacity={0.5} center={[0, 0, 0]}>
          <NativeAvatar scale={4} position={[0.1, 0, 0]} />
        </Stage>
        {/* <Caustics backside lightSource={[2.5, 5, -2.5]}> */}
        <SphereComponent />
        {/* </Caustics> */}
      </Canvas>
    </View>
  );
}
