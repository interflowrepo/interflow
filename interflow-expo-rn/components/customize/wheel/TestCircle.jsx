import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, PanResponder } from 'react-native';

const Circle = () => {
  const [spinning, setSpinning] = useState(false);
  const spinAnimation = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => Math.abs(gestureState.dx) > Math.abs(gestureState.dy),
      onPanResponderMove: (evt, gestureState) => {
        const { dx } = gestureState;
        if (dx > 0 && !spinning) {
          startSpinningAnimation(1);
        } else if (dx < 0 && !spinning) {
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
      useNativeDriver: true
    }).start(() => {
      setSpinning(false);
      spinAnimation.setValue(0);
    });
  };

  const interpolatedRotation = spinAnimation.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-180deg', '180deg']
  });

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <TouchableOpacity>
        <View style={styles.circle}>
          <Animated.View style={[styles.innerCircle, spinning && { transform: [{ rotateY: interpolatedRotation }] }]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 99, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
  },
  innerCircle: {
    width: 50,
    height: 50,
    borderRadius: 6,
    backgroundColor: 'white'
  }
});

export default Circle;
