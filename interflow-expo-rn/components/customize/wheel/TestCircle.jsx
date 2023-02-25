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

const TestCircle = ({ wheelTranslateY }) => {
  const [spinning, setSpinning] = useState(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx > 0 && !spinning) {
          startSpinningAnimation(1);
        } else if (dx < 0 && !spinning) {
          startSpinningAnimation(-1);
        }
      },
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
      spinAnimation.setValue(0);
    });
  };

  const interpolatedRotation = spinAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ["-180deg", "180deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ translateY: wheelTranslateY }] },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity>
        <ImageBackground
          source={require("../../../assets/avatar/bg(1).png")}
          style={styles.circleStyle}
        >
          {/* <View style={styles.circle}> */}
          {/* <Animated.View style={[styles.innerCircle, spinning && { transform: [{ rotateY: interpolatedRotation }] }]} /> */}
          <WheelMenuComponent
            spinning={spinning}
            interpolatedRotation={interpolatedRotation}
            color="red"
            diameter={300}
          />
          {/* </View> */}
        </ImageBackground>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    zIndex: 99,
    position: "absolute",
    left: 0,
    bottom: 300,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "gray",
    justifyContent: "center",
    alignItems: "center",
  },
  circleStyle: {
    width ,
    height: width,
    borderRadius: width / 2,
    overflow: "hidden",
    // backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 100,
    //align center horizontally
    left: 0,
    right: 0,
    alignItems: "center",
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: "white",
  },
});

export default TestCircle;
