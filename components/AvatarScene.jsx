import React, { useRef, useState } from "react";
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

import SphereActionsComponent from "../components/SphereActionsComponent";
import NativeAvatar from "../components/NativeAvatar";
import BottomSheetModal from "../components/BottomSheetModal";
import SphereComponent from "./SphereComponent";

const { width, height } = Dimensions.get("window");

const AvatarScene = () => {
  const [Zoom, setZoom] = useState(0.7)
  const [showModal, setShowModal] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;

  const toggleModal = () => {
    setShowModal(!showModal);
    Animated.spring(bottomSheetAnimation, {
      toValue: showModal ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const overlayOpacity = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const contentTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [600, 0],
  });

  const screenHeight = Dimensions.get("window").height;
  const bottomSheetHeight = screenHeight - 300;


  const handleSphereSelection = (sphere) => {
    setZoom(0.5)
    toggleModal();
  };

  const modalProps = {
    overlayOpacity,
    contentTranslateY,
    bottomSheetHeight,
    toggleModal,
    showModal
  };

  return (
    <View style={{ height, width }}>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          zIndex: 1,
          top: 0,
        }}
      >
        <View style={{ height: "100%", width: "100%" }}>
          <Canvas style={{ height, width }}>
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
              adjustCamera={Zoom}
            >
              <NativeAvatar scale={4} position={[0.1, 0, 0]} />
            </Stage>
            {/* <Caustics backside lightSource={[2.5, 5, -2.5]}> */}
            <SphereComponent onPress={handleSphereSelection} />
            {/* </Caustics> */}
          </Canvas>
        </View>
        {/* <SphereActionsComponent /> */}
      </View>
      <BottomSheetModal {...modalProps} />
    </View>
  );
};

const styles = StyleSheet.create({
  arrowsContainer: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    left: 0,
    margin: 10,
  },

  topArrow: {
    position: "absolute",
    top: 8,
    left: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },

  bottomArrow: {
    position: "absolute",
    bottom: 8,
    left: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },

  leftArrow: {
    position: "absolute",
    top: 38,
    left: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },

  rightArrow: {
    position: "absolute",
    top: 38,
    right: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
  },

  body: {
    backgroundColor: "white",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default AvatarScene;
