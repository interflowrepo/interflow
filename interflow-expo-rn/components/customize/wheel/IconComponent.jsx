import { View, Text, Image } from 'react-native'
import React from 'react'

export default function IconComponent({ uri, color, size, network }) {
  return (
    <View>
      {!network ? <Image source={uri} style={{ width: size, height: size }} /> : <Image source={{ uri }} style={{ width: size, height: size }} />}
    </View>
  )
}