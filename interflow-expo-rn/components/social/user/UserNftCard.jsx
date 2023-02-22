import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UserNftCard({onPress}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={onPress}
                style={{flex:1}}
            >
            <Text>UserNftCard</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 260,
        width:160,
        backgroundColor: "#fff",
        elevation: 1,
        margin: 30,
    },
})

