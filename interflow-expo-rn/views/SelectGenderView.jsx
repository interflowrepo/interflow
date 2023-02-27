import { StyleSheet, Text, View, Button, Dimensions, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Video } from "expo-av"

const { width, height } = Dimensions.get('window');

export default function SelectGenderView({ navigation }) {
    const [isPlaying, setIsPlaying] = useState(true);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{
                flex: 1

            }}
                onPress={() => navigation.navigate("Customize")}>
                <Video
                    source={{ uri: 'https://res.cloudinary.com/ddbgaessi/video/upload/v1677515576/Interflow_-CustomizeAvatar-1-_remix_q68rqw.mp4' }}
                    shouldPlay={isPlaying}
                    style={styles.video}
                />
            </TouchableOpacity>
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
    // container: {
    //   flex: 1,
    //   backgroundColor: "#fff",
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
    // profilePic: {
    //   width: 50,
    //   height: 50,
    // },
    // userInfo: {
    //   alignItems: "center",
    //   justifyContent: "center",
    // },
});
