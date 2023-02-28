import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  PanResponder,
  ImageBackground,
  Dimensions,
} from "react-native";
import WheelMenuComponent from "./WheelMenuComponent";

const { width, height } = Dimensions.get("window");

const WheelMenuWrapper = ({ wheelTranslateY, handleCategorySelection }) => {
  const [spinning, setSpinning] = useState(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dx, vx } = gestureState;
      },
      onPanResponderRelease: (evt, gestureState) => {
        const { dx, vx } = gestureState;
        if (dx < -100) {
          startSpinningAnimation(1);
        } else if (dx > 100) {
          startSpinningAnimation(-1);
        }
      }
    })
  ).current;

  const startSpinningAnimation = (direction) => {
    setSpinning(true);
    Animated.timing(spinAnimation, {
      toValue: direction,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setSpinning(false);
      if (spinAnimation) {
        spinAnimation.setValue(0);
      }
    });
  };


  const interpolatedRotation = spinAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["180deg", "-180deg"],
  });



  return (
    <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: wheelTranslateY }] },
        ]}
    >
      <ImageBackground
        source={require("../../../assets/avatar/bg(1).png")}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 600,
          width: 600,
          zIndex: 98,
          position: "absolute",
          left: width / 2 - 300, // align to the middle of the screen
          bottom: 400,
          borderRadius: 300,
          overflow: "hidden",
          borderColor: "lightgrey",
          borderWidth: 0.5,
        }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}
          {...panResponder.panHandlers}
        >
          <WheelMenuComponent
            spinning={spinning}
            interpolatedRotation={interpolatedRotation}
            color="red"
            diameter={450}
            handleCategorySelection={handleCategorySelection}
          />
        </View>
      </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: width,
    height: height + 90,
    zIndex: 110,
    position: "absolute",
    left: 0,
    bottom: - height / 1.2,
    // borderColor: "blue",
    // borderWidth: 0.5,
    borderRadius: 120
  },
});

export default WheelMenuWrapper;
