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
import MetaElementsMenu from "./MetaElementsMenu";

const { width, height } = Dimensions.get("window");

const MetaWheelWrapper = ({ wheelTranslateY , handleAccesorySelection}) => {
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
                    height: 500,
                    width: 500,
                    zIndex: 98,
                    position: "absolute",
                    left: width / 2 - 250, // align to the middle of the screen
                    bottom: -150,
                    borderRadius: 250,
                    overflow: "hidden",
                    borderColor: "lightgrey",
                    borderWidth: 0.5,
                }}
            >
                <View
                    style={{
                        height:500,
                        width,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // borderColor: "yellow",
                        // borderWidth: 1,
                        borderRadius: 250,
                    }}
                    {...panResponder.panHandlers}
                >
                    <MetaElementsMenu
                        spinning={spinning}
                        interpolatedRotation={interpolatedRotation}
                        color="red"
                        diameter={300}
                        handleAccesorySelection={handleAccesorySelection}
                    />
                </View>
            </ImageBackground>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: width,
        height: 300,
        zIndex: 120,
        position: "absolute",
        left: 0,
        bottom: -250,
        // borderColor: "lightgrey",
        // borderWidth: 0.5,
    },
});

export default MetaWheelWrapper;
