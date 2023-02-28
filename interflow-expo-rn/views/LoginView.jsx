import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { Video } from "expo-av"
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryBtnComponent from '../components/PrimaryBtnComponent';

const { width, height } = Dimensions.get('window');


export default function LoginView({ navigation }) {
  const [isPlaying, setIsPlaying] = useState(true);

  const { login, logout, userAuthData, auth, userFullData } =
    useAuth();
  console.log("getUserData inside login page: ", userAuthData);
  console.log("userFullData inside login page: ", userFullData);

  const getAllStorageData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log("result", result);
      return result;
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    if (auth) {
      navigation.navigate("Onboarding")
    }

  }, [auth]);


  return (
    <View style={styles.container}>
      {/* {auth && ( */}
      <>
        <Video
          source={{ uri: 'https://cdn.discordapp.com/attachments/1073307357964148836/1079909968267989012/Presentacion_video.mp4' }}
          shouldPlay={isPlaying}
          style={styles.video}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
          style={styles.overlay}
        />
        <View style={styles.actionContainer}>
          <PrimaryBtnComponent label={"Login / Sign up"} onPress={login} />
          <TouchableOpacity style={{
            margin: 14
          }}
            onPress={() => navigation.navigate("Onboarding")}
          >
            <Text style={{ color: "white", marginTop: 10, fontWeight: "700" }}>EXPLORE APP</Text>
          </TouchableOpacity>
        </View>
      </>
      {/* )} */}
      {/* {!auth && <Button title={"Login"} onPress={login} />}
      {auth && <Button title="Logout" onPress={logout} />} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width,
    height: "100%"
  },

  actionContainer: {
    position: "absolute",
    bottom: 90,
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent"
  },


  video: {
    flex: 1,
    // width,
    height: "100%"
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  // container: {
  //   flex: 1,
  //   backgroundColor: "#fff",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // profilePic: {
  //   width: 50,
  //   height: 50,
  // },
  // userInfo: {
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
});
