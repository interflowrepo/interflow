import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import AvatarScene from "../components/AvatarScene";

export default function PfpView() {
  const [PlaceholderImage, setPlaceholderImage] = useState(
    "https://res.cloudinary.com/ddbgaessi/image/upload/v1676667835/flovaty-removebg-preview_dj7vdp.png"
  );
  const [SelectedImage, setSelectedImage] = useState(
    "https://res.cloudinary.com/ddbgaessi/image/upload/v1676667835/flovaty-removebg-preview_dj7vdp.png"
  );
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    // if (status === "granted") {
      // onSaveImageAsync();
    // }
  }, [status]);

  const onSaveImageAsync = async () => {
    alert("Save")
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource =
      selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

    return <Image source={imageSource} style={styles.image} />;
  }

  return (
    <View style={styles.imageContainer}>
      <View ref={imageRef} collapsable={false}>
        {/* <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={SelectedImage}
        /> */}
        <AvatarScene pfp handleImgSave={onSaveImageAsync} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
});
