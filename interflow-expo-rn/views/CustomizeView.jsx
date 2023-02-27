import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState, Suspense } from "react";
import AvatarScene from '../components/AvatarScene'
import BottomSheetModal from '../components/BottomSheetModal'
import TestCircle from '../components/customize/wheel/TestCircle';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const CloseActionComponent = ({ toggleModal, type }) => {
  return (
    <View style={{ position: "absolute", top: 50, right: 20, zIndex: 100 }}>
      <TouchableOpacity
        onPress={() => {
          toggleModal(type);
        }}
      >
        <MaterialCommunityIcons
          name="close-circle"
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default function CustomizeView() {
  const [showModal, setShowModal] = useState(false);
  const [showWheelModal, setShowWheelModal] = useState(false);
  const bottomSheetAnimation = useRef(new Animated.Value(0)).current;
  const [Zoom, setZoom] = useState(0.7);
  const [SelectedSphere, setSelectedSphere] = useState("accesories")
  const [SelectedAccesory, setSelectedAccesory] = useState(null)



  const toggleModal = (type) => {
    if (showModal || showWheelModal) setZoom(0.7);

    type == "accesories"
      ? setShowModal(!showModal)
      : setShowWheelModal(!showWheelModal);

    Animated.spring(bottomSheetAnimation, {
      toValue: showModal || showWheelModal ? 0 : 1,
      useNativeDriver: true,
    }).start();
  };

  const handleAccesorySelection = (type) => {
    setSelectedAccesory(type)
  }

  const overlayOpacity = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const contentTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 2],
    outputRange: [600, 0],
  });

  const wheelTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });


  const screenHeight = Dimensions.get("window").height;
  const bottomSheetHeight = screenHeight;

  const handleSphereSelection = (type) => {
    setSelectedSphere(type)

    if (type == "camera") {
      // handleImgSave();
    } else {
      setZoom(0.5);
      toggleModal(type);
    }
  };

  const modalProps = {
    overlayOpacity,
    contentTranslateY,
    bottomSheetHeight,
    toggleModal,
    showModal,
    handleAccesorySelection
  };

  const closeProps = {
    toggleModal,
    showModal,
    type: SelectedSphere
  };



  const modalWheelProps = {
    wheelTranslateY,
    bottomSheetHeight,
  };

  const avatarProps = {
    handleSphereSelection,
    zoom: Zoom,
    pfp: false,
    SelectedAccesory
  };


  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <AvatarScene {...avatarProps}  />
      {(showModal || showWheelModal) && <CloseActionComponent {...closeProps} />}
      <TestCircle {...modalWheelProps}  />
      <BottomSheetModal {...modalProps}  />
    </View>
  )
}