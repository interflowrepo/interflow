import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import AvatarScene from "../components/AvatarScene";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function PfpView({ navigation }) {
  const [PlaceholderImage, setPlaceholderImage] = useState(
    "https://res.cloudinary.com/ddbgaessi/image/upload/v1676667835/flovaty-removebg-preview_dj7vdp.png"
  );
  const [SelectedImage, setSelectedImage] = useState("");
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const imageRef = useRef();

  if (status === null) {
    requestPermission();
  }

  useEffect(() => {
    // if (status === "granted") {
    // onSaveImageAsync();
    // pickImageAsync();
    // }
  }, [status]);

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 400,
        quality: 1,
      });

      setSelectedImage(localUri);
      
    } catch (e) {
      console.log(e);
    }
  };

  const saveToLocalStorage = async () => {
    // Alert("Image saved to your phone's gallery")
    try {
      // const asset = await MediaLibrary.createAssetAsync(SelectedImage);
      // await MediaLibrary.createAlbumAsync("Flovaty", asset, false);
      navigation.navigate("Home");
    } catch (e) {
      console.log(e);
    }
  };

  function ConfirmButton() {
    return (
      <View
        style={{
          width: width,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: 100,
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            saveToLocalStorage();
          }}
        >
          <Text>Confirm</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function ImageViewer({ placeholderImageSource, selectedImage }) {
    const imageSource =
      selectedImage !== null ? { uri: selectedImage } : placeholderImageSource;

    return (
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={imageSource} style={styles.image} />
        <View style={{ height: 30 }} />
        <ConfirmButton />
      </View>
    );
  }

  return (
    <View style={styles.imageContainer}>
      <View ref={imageRef} collapsable={false} style={{
        flex: 1,
      }}>
        {SelectedImage ? (
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={SelectedImage}
          />
        ) : (
          <AvatarScene pfp handleSphereSelection={onSaveImageAsync} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
   
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    // resizeMode: "contain",
  },
});
