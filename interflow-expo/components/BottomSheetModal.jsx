import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  Alert,
} from "react-native";
import HorizontalList from "./HorizontalList";

const BottomSheetModal = ({
  overlayOpacity,
  contentTranslateY,
  bottomSheetHeight,
  toggleModal,
  showModal
}) => {

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      zIndex: showModal ? 99 : 0,
    },
    button: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 18,
    },
    modalContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
      zIndex: 99,
    },
    overlay: {
      flex: 1,
    },
    modalContent: {
      display: "flex",
      flexDirection: "column",
      backgroundColor: "black",
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      height: bottomSheetHeight,
      zIndex:3
    },
    background: {
      flex: 1,
      resizeMode: "contain",

      borderRadius: 33,
      paddingTop: 33,
      paddingLeft: 10,
    },

    backgroundContainer: {
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      overflow: "hidden",
      flex: 1,
    },

    modalText: {
      fontSize: 18,
      marginBottom: 20,
      color: "white",
    },
    modalButton: {
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
      marginTop: 20,
    },
    modalButtonText: {
      color: "white",
      fontSize: 18,
    },
  });

  return (
    <View style={styles.container}>
      {showModal && (
        <Animated.View style={[styles.modalContainer]}>
          <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
          <Animated.View
            style={[
              styles.modalContent,
              { transform: [{ translateY: contentTranslateY }] },
            ]}
          >
            <View style={styles.backgroundContainer}>
              <ImageBackground
                source={require("../assets/avatar/bg(1).png")}
                style={styles.background}
              >
            <HorizontalList />
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={toggleModal}
                >
                  <Text style={styles.modalButtonText}>Close</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </Animated.View>
        </Animated.View>
      )}
    </View>
  );
};

export default BottomSheetModal;
