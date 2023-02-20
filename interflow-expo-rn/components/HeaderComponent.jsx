import { View, Text, ImageBackground, StyleSheet } from "react-native";
import React from "react";
import { useUser } from "../contexts/UserContext";
import PfpComponent from "./header/PfpComponent";

export default function HeaderComponent() {
  const { user } = useUser();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        // borderBottomWidth: 1,
        // borderBottomColor: '#f0f0f0',
      }}
    >
      <ImageBackground
        source={require("../assets/avatar/bg(1).png")}
        style={{
          flex: 1,
          width: "100%",
          resizeMode: "cover",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: 120,
        }}
      >
        <PfpComponent pfpUrl={user.pfpUrl} />
        <View style={styles.txtContainer}>
          <Text style={styles.txt}> Search...</Text>
        </View>
        <View style={styles.txtContainer}>
          <Text style={styles.txt}> Icon</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  txtContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width:"33%"
  },
});
