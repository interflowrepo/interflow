import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import IconComponent from "./IconComponent";

const WheelMenuComponent = ({
  diameter,
  color,
  spinning,
  interpolatedRotation,
  handleCategorySelection,
  selectedAccesoryCategory
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

  const IconStyle = {
    position: "absolute",
    color: "white",
    fontSize: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const icons = [
    {
      id: 1,
      uri: require("../../../assets/avatar/inactive-shirt.png"),
    },
    {
      id: 2,
      uri: require("../../../assets/avatar/inactive-shirt.png"),
    },
    {
      id: 3,
      uri: require("../../../assets/avatar/inactive-sneaker.png"),
    },
    {
      id: 4,
      uri: require("../../../assets/avatar/inactive-shirt.png"),
    },
    {
      id: 5,
      uri: require("../../../assets/avatar/inactive-shirt.png"),
    },
    {
      id: 6,
      uri: require("../../../assets/avatar/inactive-sneaker.png"),
    },
    {
      id: 7,
      name: "hat",
      uri: selectedAccesoryCategory == "hat" ? require(`../../../assets/avatar/hat.png`) : require(`../../../assets/avatar/inactive-hat.png`),
    },
    {
      id: 8,
      name: "shirt",
      uri: require(`../../../assets/avatar/shirt.png`),
    },
    {
      id: 3,
      uri: require("../../../assets/avatar/inactive-sneaker.png"),
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
          <TouchableOpacity
            key={index}
            style={[
              IconStyle,
              { top: translateY, left: translateX },
              {
                transform: [{ rotate: rotateZ }],
              },
            ]}
            onPress={() => handleCategorySelection(icon.name)}
          >
            <IconComponent uri={icon.uri} size={30} color={color} />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

export default WheelMenuComponent;
