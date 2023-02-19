import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';

export default function VideoPlayerComponent() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  React.useEffect(() => {

    video.current.playAsync()
    video.current.setNativeProps({
      backgroundColor: 'transparent',
    })

    return () => {
      video.current.unloadAsync();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://res.cloudinary.com/ddbgaessi/video/upload/v1676417880/vid_l80bft.webm',
        }}
        // useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex:-2,
    backgroundColor: 'transparent',
  },
  video: {
    alignSelf: 'center',
    width: 300,
    height: 300,
    backgroundColor:"transparent"
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});