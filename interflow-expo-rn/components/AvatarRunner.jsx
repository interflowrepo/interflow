import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
 
export default function AvatarRunner({height, width}) {
  return (
    <View style={{height, top:0, zIndex:0, backgroundColor:"green", position:"relative"}}>
        <WebView source={{ uri: 'https://interflow-three.vercel.app/' }} />
    </View>
  )
}