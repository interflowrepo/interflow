import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function SecondaryBtn({ label, onPress }) {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}
      onPress={onPress}
    >
      <Text style={{
        fontSize: 20,
      }}  >{label}</Text>
    </TouchableOpacity>
  )
}