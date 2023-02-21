import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Canvas, useFrame } from "@react-three/fiber/native";
import { PerspectiveCamera } from "@react-three/drei/native";
import React from "react";
// import SphereComponent from "../../components/SphereComponent";
// import NativeAvatar from "../../components/NativeAvatar";
import AvatarRunner from "../../components/AvatarRunner";

const { width, height } = Dimensions.get("window");

export default function MetaraceView() {
  const handlePress = (event) => {
    alert("pressed");
    const x = event.nativeEvent.locationX;

    // setAvatarPosition({ x: x, y: avatarPosition.y });
  };

  const BluePlaneComponent = () => {
    const planeRef = React.useRef();

    useFrame(() => {
      planeRef.current.position.z += 0.01;
      // if the plane has moved too far down, reset its position to the top

      // console.log(planeRef.current.position.z);

      if (planeRef.current.position.z >= 10) {
        planeRef.current.position.z = -10;
      }
    });
    return (
      <group
        ref={planeRef}
        position={[0, 0, 0]}
        rotation={[-1.5, 0, 0]}
        onPointerDown={(e) => {}}
      >
        <mesh>
          <planeGeometry args={[2, 10]} />
          <meshBasicMaterial color="blue" />
        </mesh>
      </group>
    );
  };
  const YellowPlaneComponent = () => {
    const planeRef = React.useRef();

    const movementSpeed = 0.1; // adjust as needed
    useFrame(() => {
      planeRef.current.position.z += 0.01;
      // if the plane has moved too far down, reset its position to the top

      // console.log(planeRef.current.position.z);

      if (planeRef.current.position.z >= 10) {
        planeRef.current.position.z = -10;
      }
    });
    return (
      <group ref={planeRef} position={[0, 0, -10]} rotation={[-1.5, 0, 0]}>
        <mesh>
          <planeGeometry args={[2, 10]} />
          <meshBasicMaterial color="yellow" />
        </mesh>
      </group>
    );
  };

  const GesturePlaneComponent = () => {
    return (
      <group
        position={[0, 0, 2]}
        rotation={[0, 0, 0]}
        onPointerDown={(e) => {
          console.log("pointer down");
          alert("pointer down");

          const x = e.nativeEvent.locationX;
        }}
      >
        <mesh>
          <planeGeometry args={[3, 10]} />
          <meshBasicMaterial opacity={0} transparent />
        </mesh>
      </group>
    );
  };

  return (
    <View style={{ width: width, height: height }}>
      <Canvas style={{ width: width, height: height }}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          rotation={[0, 0, 0]}
        />
        {/* <BluePlaneComponent />
        <YellowPlaneComponent />
        <GesturePlaneComponent /> */}
        <mesh>
          {/* <sphereGeometry args={[0.5, 32, 32]} /> */}
           {/* <NativeAvatar position={[0, 0, 0]}/> */}
           <AvatarRunner position={[0, 0.9, 0]}/>
        </mesh>
                   {/* <SneakersModel position={[0, 0, 0]} scale={1}/> */}

      </Canvas>
    </View>
  );
}
