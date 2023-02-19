import React, { useRef } from 'react';
import { View, StyleSheet, Text, PanResponder, Animated } from 'react-native';

const Circle = ({ diameter, color }) => {
  const circleStyle = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 99,
  };

  const textStyle = {
    position: 'absolute',
    color: 'white',
    fontSize: 24,
  };

  const letters = 'ABCDEFGHIJKLMNOP'.split('');
  const rotate = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: rotate }], { useNativeDriver: true }),
    })
  ).current;

  return (
    <View style={circleStyle} {...panResponder.panHandlers}>
      {letters.map((letter, index) => {
        const angle = (index * 360) / letters.length;
        const radians = angle * (Math.PI / 180);
        const x = (diameter / 2 + 30) * Math.cos(radians);
        const y = (diameter / 2 + 30) * Math.sin(radians);
        const rotation = Math.atan2(diameter / 2 - y, diameter / 2 - x) + Math.PI / 2;
        const rotateZ = `${rotation}rad`;
        const translateX = -10;
        const translateY = -12;

        return (
          <View
            key={index}
            style={[
              textStyle,
              { top: diameter / 2 + y, left: diameter / 2 + x },
              { transform: [{ translateX }, { translateY }, { rotate: rotateZ }] },
            ]}
          >
            <Text>{letter}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Circle;
