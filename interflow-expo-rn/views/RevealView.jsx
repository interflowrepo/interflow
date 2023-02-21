import { View, Text } from "react-native";
import React from "react";
import { WebView } from "react-native-webview";

export default function RevealView() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: "https://3d-flow-mintsite.vercel.app/" }}
        style={{ marginTop: 0 }}
      />
    </View>
  );
}
