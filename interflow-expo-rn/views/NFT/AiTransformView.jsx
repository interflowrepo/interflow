import React, { useState, useRef, useEffect } from 'react';
import { TextInput, View, Animated, StyleSheet, Dimensions, Image, Text } from 'react-native';
import UserNftCard from '../../components/social/user/UserNftCard';
import PrimaryBtnComponent from '../../components/PrimaryBtnComponent';


const windowWidth = Dimensions.get('window').width;

const CustomTextInput = ({ placeholderText }) => {
    const [text, setText] = useState('');

    const handleTextChange = (value) => {
        setText(value);
    };





    return (
        <View style={styles.container}>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={[styles.textInput]}
                    placeholder={placeholderText}
                    onChangeText={handleTextChange}
                    value={text}
                    multiline={true}
                />
            </View>
        </View>
    );
};

const AiTransformView = () => {
    const [IsCreatingVariation, setIsCreatingVariation] = useState(false)


    useEffect(() => {
        setTimeout(() => {
            hideOverlay();
        }
            , 3000);
    }, [])


    const overlayOpacity = useRef(new Animated.Value(1)).current;
    const hideOverlay = () => {
        Animated.timing(overlayOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const initVariation = () => {
        alert("Creating Variation...")
        setIsCreatingVariation(true)
    }

    return (
        <View style={styles.appContainer}>
            <UserNftCard width={IsCreatingVariation ? 140 : 260} height={IsCreatingVariation ? 200 : 400} />
            {IsCreatingVariation ?
                <Image
                    source={{
                        uri: 'https://cdn.discordapp.com/attachments/1073306606005145692/1079121507487322242/lootnegro.gif',
                    }}
                    style={styles.image}
                /> :
                <CustomTextInput
                    placeholderText="My Doodle NFT in the moon..."
                />
            }

            <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />
            {!IsCreatingVariation ? <View style={{
                zIndex: 99
            }}>
                <PrimaryBtnComponent label="Create Variation" onPress={initVariation} />

            </View> : <View style={{
                height: "20%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                    }}>
                    Your variation is processing!</Text>
                <View style={{ height: "6%" }} />
                <Text>You will receive a push
                    notification when it´s done</Text>
            </View>
            }
            <View style={{ height: 30 }} />
        </View>
    );
};

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
    },

    image: {
        width: 300,
        height: 300,
    },

    container: {
        zIndex: 2,
        flex: 1,
        display: "flex",
        width: windowWidth,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textInputContainer: {
        zIndex: 2,
        flex: 1,
        width: windowWidth,
        // position:"absolute",
    },
    textInput: {
        height: "30%",
        width: windowWidth,
        backgroundColor: '#fff',
        padding: 10,
        zIndex: 1,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(1,1,1,0.5)',
        zIndex: 1,
    },
});

export default AiTransformView;
