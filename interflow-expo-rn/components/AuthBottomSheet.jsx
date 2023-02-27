import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View, Pressable, Text, Image, Button } from "react-native";
import { BlurView } from "expo-blur";
import PrimaryBtnComponent from "./PrimaryBtnComponent";
import { display } from "@onflow/fcl";

export default function AuthBottomSheet({ setIsOpen, onPress }) {
    return (
        <BlurView
            tint="dark"
            intensity={70}
            borderBottomRightRadius={60}
            borderBottomLeftRadius={60}
            style={{
                marginTop: 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                position: "absolute",
                bottom: 0,
                height: "100%",
                borderTopLeftRadius: 60,
                borderTopRightRadius: 60,
                width: "110%",
                marginLeft: "-6%",
                overflow: "hidden",
                zIndex: 100,
            }}
        >
            <Pressable
                onPress={() => {
                    setIsOpen(false);
                }}
                style={{
                    flex:1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",

                }}
            >
                <View style={{
                backgroundColor: "white",
                height: "30%",
                borderRadius: 12,
                width: "70%",
            }}>
                <View style={{
                    height:"70%",
                    borderBottomWidth: 0.5,
                    borderBottomColor: "lightgrey",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <Text style={{ color: "black", fontSize:20, fontWeight:"bold", textAlign:"center" }}>
                        You need to login to use this feature
                    </Text>
                </View>
                <View style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "30%",
                }}>
                    <PrimaryBtnComponent label={"LOGIN / SIGN UP"} onPress={onPress} />
                </View>
            </View>
            </Pressable>
            
        </BlurView>
    );
};


const styles = StyleSheet.create({

    buttonContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        height: 50,
        marginTop: 10,
    },


    walletName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },

    walletAddress: {
        fontSize: 12,
        color: "grey",
    },

    textContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        flex: 1,
        paddingLeft: 14,
        height: "100%",
    },

    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'white',
    },
    status: {
        position: 'absolute',
        top: -3,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    container: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    walletCard: { backgroundColor: "white", padding: 0, elevation: 1, width: "100%", height: 70, marginVertical: 10, borderRadius: 50, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: 10,
    },
});
