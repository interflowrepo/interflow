import { View, Text, Animated, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useRef, useState, Suspense, useEffect } from "react";
import AvatarScene from '../components/AvatarScene'
import BottomSheetModal from '../components/BottomSheetModal'
import WheelMenuWrapper from '../components/customize/wheel/WheelMenuWrapper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MetaWheelWrapper from '../components/customize/wheel/MetaWheelWrapper';
import { LinearGradient } from 'expo-linear-gradient';


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
  const wheelSheetAnimation = useRef(new Animated.Value(0)).current;
  const [Zoom, setZoom] = useState(0.7);
  const [SelectedSphere, setSelectedSphere] = useState("")
  const [SelectedTemplate, setSelectedTemplate] = useState(null)
  const [SelectedCategory, setSelectedCategory] = useState(null)
  const [IsTwoSelected, setIsTwoSelected] = useState(false)

  useEffect(() => {
    // toggleModal("other ")

  }, [])


  const handleCategorySelection = (category) => {
    setSelectedCategory(category)
  }



  const toggleModal = (type) => {
    if (showModal || showWheelModal) setZoom(0.7);

    if (type == "accesories") {
      setShowModal(!showModal)
      Animated.spring(bottomSheetAnimation, {
        toValue: showModal ? 0 : 1,
        useNativeDriver: true,
      }).start();
    } else {
      setShowWheelModal(!showWheelModal)
      Animated.spring(wheelSheetAnimation, {
        toValue: showWheelModal ? 0 : 1,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleTemplateSelection = (type) => {
    setSelectedTemplate(type)
  }

  const overlayOpacity = bottomSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5],
  });

  const contentTranslateY = bottomSheetAnimation.interpolate({
    inputRange: [0, 2],
    outputRange: [600, 0],
  });

  const wheelTranslateY = wheelSheetAnimation.interpolate({
    inputRange: [0, SelectedCategory ? 0.7 : 1.5],
    outputRange: [200, 0],
  });

  const metaTranslateY = wheelSheetAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [800, 0],
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
    handleTemplateSelection,

  };

  const closeProps = {
    toggleModal,
    showModal,
    type: SelectedSphere
  };



  const modalWheelProps = {
    wheelTranslateY,
    bottomSheetHeight,
    handleCategorySelection
  };

  const metaWheelProps = {
    wheelTranslateY,
    bottomSheetHeight,
  };

  const avatarProps = {
    handleSphereSelection,
    zoom: Zoom,
    pfp: false,
    SelectedTemplate,
    isTwoSelected: IsTwoSelected,
    showModal,
    showWheelModal,
  };


  return (
    <View style={{ flex: 1,  }}>
      <LinearGradient
        colors={['rgba(1,1,1,1)','rgba(0,0,0,0.9)', ]}
        style={styles.overlay}
      />  
      <AvatarScene {...avatarProps} />
      {(showModal || showWheelModal) && <CloseActionComponent {...closeProps} />}
      <WheelMenuWrapper {...modalWheelProps} />
      <MetaWheelWrapper {...metaWheelProps} />
      <BottomSheetModal {...modalProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});