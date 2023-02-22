import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UserCollectionCard({ onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ height: 100, width: "80%", backgroundColor: "#fff", elevation: 1, margin: 30, }}
        >
            <Text>UserCollectionCard</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: "80%",
        backgroundColor: "#fff",
        elevation: 1,
        margin: 30,
    },
})

