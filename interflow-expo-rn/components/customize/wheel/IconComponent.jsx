import { View, Text, Image } from 'react-native'
import React from 'react'

export default function IconComponent({uri, color, size}) {
  return (
    <View>
        <Image source={uri} style={{width: size, height: size}}/>
    </View>
  )
}