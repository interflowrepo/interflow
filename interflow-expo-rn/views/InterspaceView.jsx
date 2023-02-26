import { View, Text } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';

export default function InterspaceView() {
    return (
        <View style={{ flex: 1, }}>
            <WebView
                source={{ uri: 'https://interflow-metaspace.vercel.app/' }}
            />
        </View>
    ) 
}