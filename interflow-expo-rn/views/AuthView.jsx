import { View, Text, StyleSheet, Dimensions, } from 'react-native'
import React, { useState } from 'react'
import { Video } from "expo-av"
import { LinearGradient } from 'expo-linear-gradient';
import PrimaryBtnComponent from '../components/PrimaryBtnComponent';


const { width, height } = Dimensions.get('window');

export default function AuthView() {
        const [isPlaying, setIsPlaying] = useState(true);

    return (
        <View style={styles.container}>
            <Video
                source={{ uri: 'https://cdn.discordapp.com/attachments/950238425192206388/1074856644359499826/Color.mov' }}
                shouldPlay={isPlaying}
                style={styles.video}
            />
            <LinearGradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,1.)']}
                style={styles.overlay}
            />
            <View style={styles.actionContainer}>
                <PrimaryBtnComponent label={"Login / Sign up"} />

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        width,
        height: "100%"
    },

    actionContainer: {
        position: "absolute",
        bottom: 90,
        width: "100%",
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },


    video: {
        flex: 1,
        // width,
        height: "100%"
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
