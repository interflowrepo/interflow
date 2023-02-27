import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UserNftCard({ onPress, width, height }) {

    const styles = StyleSheet.create({
        container: {
            height,
            width,
            backgroundColor: "#fff",
            elevation: 1,
            margin: 30,
            borderWidth: 2,
            borderColor: "#000",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.20,
            shadowRadius: 1.41,
        },
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={{ flex: 1 }}
            >
                <Text>UserNftCard</Text>
            </TouchableOpacity>
        </View>
    )
}



