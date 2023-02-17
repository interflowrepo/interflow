import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function PagerViewsComponent({ steps, width, height}) {

    const styles = StyleSheet.create({
        viewPager: {
          flex: 1,
          backgroundColor: "#FFFFF",
        },
        page: {
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#FFFFF",
          position: "relative",
        },
      
        secondaryBtnContainer: {
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 14,
        },
      
        txtContainer: {
          width: width,
          height: height / 1.7,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      
        img1: {
          marginTop: 70,
        },
      
        img2: {
          width: 300,
          resizeMode: "cover",
          position: "absolute",
          top: height / 5,
        },
      });
  return (
    <View>
      {steps.map((step, i) => (
        <View style={styles.page} key={i}>
          <Image source={require("../assets/n1.png")} style={styles.img2} />
          <View style={styles.txtContainer}>
            <Text
              style={{
                fontSize: 30,
                textAlign: "center",
                padding: 40,
              }}
            >
              {step.label}
            </Text>
          </View>
          <View
            style={{
              margin: 20,
              padding: 20,
            }}
          >
            <PrimaryBtn
              width={dimensions.width - 20}
              label={"continue"}
              dimensions={dimensions}
            />
            <View style={styles.secondaryBtnContainer}>
              <SecondaryBtn label={"SKIP"} />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

