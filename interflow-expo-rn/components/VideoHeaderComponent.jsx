import React, { useState } from 'react';
import { StyleSheet, View, Button, Dimensions } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryBtnComponent from './PrimaryBtnComponent';

const { width } = Dimensions.get('window');

export default function VideoHeaderComponent({uri}) {
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlaying = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <Video
        source={{ uri }}
        shouldPlay={isPlaying}
        style={styles.video}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      />
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width,
    height: 320,
    overflow: 'hidden',
  },
  video: {
    // flex: 1,
    width,
    height: 400,
  
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
