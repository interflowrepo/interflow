import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import PfpComponent from "./header/PfpComponent";

export default function HeaderComponent() {



  return (
   
      <ImageBackground
        source={require("../assets/avatar/bg(1).png")}
        style={{
          flex: 1,
          width: "100%",
          resizeMode: "cover",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          height: 120,
        }}
      >
        
        {/* <View style={styles.txtContainer}>
          <Text style={styles.txt}> Search...</Text>
        </View> */}
       
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 34,
    width:"33%",
    position: "relative",
    backgroundColor: "white",
    borderRadius: 15,
    margin: 10,
  },


  txt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },

  txtContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    height: 120,
    width:"33%"
  },
});
