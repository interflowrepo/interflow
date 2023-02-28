import React, { useRef, useState, Suspense } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import { Canvas } from "@react-three/fiber/native";
import {
  Environment,
  Caustics,
  PerspectiveCamera,
  Stage,
  useFrame,
  Backdrop,
} from "@react-three/drei/native";

import NativeAvatar from "../components/NativeAvatar";
import SphereComponent from "./SphereComponent";


const { width, height } = Dimensions.get("window");

const AvatarScene = ({ pfp, handleSphereSelection, zoom, SelectedTemplate, showModal, showWheelModal }) => {

  return (

    <Canvas style={{ height, width, zIndex: 99, position: "absolute" }}>
      <Suspense fallback={() => <group></group>}>

        <Backdrop
          floor={0.6}
          segments={100}
          args={[1000, 500]}
          position={[0, -6, -12]}
          scale={[30, 50, 16]}
        >
          <meshStandardMaterial color="#353540" />
        </Backdrop>

        <Stage
          intensity={0.1}
          contactShadowOpacity={0.5}
          // center={[0, 0, 0]}
          adjustCamera={zoom}
        >
          <NativeAvatar scale={4} position={[0.1, 0, 0]} selectedTemplate={SelectedTemplate} />
        </Stage>
        {/* <Caustics backside lightSource={[2.5, 5, -2.5]}> */}
        {!pfp ? (
          <>
            <SphereComponent
              position={[(showModal || showWheelModal) ?   5 : 2.7, 3, 0]}
              type="accesories"
              onPress={handleSphereSelection}
            />
            <SphereComponent
              position={[(showModal || showWheelModal) ?   5 : 2.7, 1, 0]}
              type="outfit"
              onPress={handleSphereSelection}
            />
          </>
        ) : (
          <SphereComponent
            position={[0, -3, 4]}
            type="camera"
            onPress={handleSphereSelection}
          />
          // <SphereComponent
          //   position={[0, -3.3, 2]}
          //   type="camera"
          //   onPress={handleSphereSelection}
          // />
        )}
        {/* </Caustics> */}
      </Suspense>
    </Canvas>

  );
};

const styles = StyleSheet.create({

});

export default AvatarScene;



    //   {/* <BottomSheetModal {...modalProps} />
    //   {/* <View style={styles.circleContainer}> */}
    //   // {showWheelModal && <TestCircle {...modalWheelProps} />}
    // </View> */}