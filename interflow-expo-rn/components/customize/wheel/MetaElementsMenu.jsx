import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
  ImageBackground,
} from "react-native";
import IconComponent from "./IconComponent";

const WheelMenuComponent = ({
  diameter,
  color,
  spinning,
  interpolatedRotation,
}) => {
  const circleStyle = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    alignItems: "center",
    justifyContent: "center",
    // position: "absolute",
    zIndex: 80,
  };

  const iconStyle = {
    position: "absolute",
    color: "white",
    fontSize: 24,
    width:60,
    height:60,
    borderRadius:30,
    borderWidth:1,
    borderColor:"white",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  };

  const icons = [
    {
      id: 1,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 2,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 3,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 1,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 2,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 3,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 1,
      uri: "https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png",
    },
    {
      id: 2,
      uri:"https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png" ,
    },
    {
      id: 3,
      uri:"https://cdn.discordapp.com/attachments/1073317467734151279/1079883177683857518/helmet.png" ,
    },
  ];



  const rotate = useRef(new Animated.Value(0)).current;

  return (
    <Animated.View
      style={[
        spinning && {
          transform: [
            { rotate: interpolatedRotation },
            { perspective: 1000 },
          ],
        },
        circleStyle,
      ]}
    >
      {icons.map((icon, index) => {
        const angle = (index * 360) / icons.length;
        const radians = angle * (Math.PI / 180);
        const x = (diameter / 2 + 30) * Math.cos(radians);
        const y = (diameter / 2 + 30) * Math.sin(radians);
        const rotation =
          Math.atan2(diameter / 2 - y, diameter / 2 - x) - Math.PI / 2; // Adjusted value
        const rotateZ = `${rotation}rad`;
        const translateX = diameter / 2 + x - 12;
        const translateY = diameter / 2 + y - 18;

        return (
          <View
            key={index}
            style={[
              iconStyle,
              { top: translateY, left: translateX },
              {
                transform: [{ rotate: rotateZ }],
              },
            ]}
          >
            <IconComponent uri={icon.uri} size={40} color={color} network />
          </View>
        );
      })}
    </Animated.View>
  );
};

export default WheelMenuComponent;
