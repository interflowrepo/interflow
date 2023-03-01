import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useMemo } from 'react'

export default function UserNftCard({ onPress, width, height, name, id, thumbnail }) {

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
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
    })

    const thumbnailCheck = useMemo(() => {
        if(!thumbnail) return
        if (thumbnail.includes("ipfs")) {
            let thumbnailSplit = thumbnail.replace("ipfs://", "")
            //https://cloudflare-ipfs.com/ipfs/
            //https://gateway.pinata.cloud/ipfs/
            return `https://cloudflare-ipfs.com/ipfs/${thumbnailSplit}`
        } else {
            return thumbnail
        }
    }, [thumbnail])

    console.log(thumbnailCheck)

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={{
            uri: thumbnailCheck,
            }} />
            <TouchableOpacity
                onPress={onPress}
                style={{ flex: 1 }}
            >
                <Text>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}