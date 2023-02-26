import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";
import { useFcl } from "../contexts/FclContext";
import PrimaryBtnComponent from "../components/PrimaryBtnComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";



export default function WalletsConnectionView() {
  const { authenticate, removeWallet, wallets, onPressActionFn } = useFcl();



  console.log("wallet na", wallets[0]?.walledName)

  const removeWalletFn = useCallback(async (address) => {
    await removeWallet(address);
  }, []);



  const LogoContainer = ({ isOn }) => {
    const statusColor = isOn ? 'lightgreen' : 'grey';
    return (
      <View style={styles.logoContainer}>
        <View style={styles.logo} >
          <Image source={{
            uri: "https://res.cloudinary.com/ddbgaessi/image/upload/v1677272668/logo_kkdwhj.png"
          }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </View>
        <View style={[styles.status, { backgroundColor: statusColor }]} />
      </View>
    );
  };




  return (
    <View style={styles.container}>

      <View
        style={{
          flex: 1,
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingHorizontal: 10,
        }}>


        {/* {wallets.map((wallet, index) => {
          console.log("wallet name", wallet.walledName)

          const isConnected = wallet.connected;

          return (
            <View style={styles.walletCard} key={index}>
              <LogoContainer isOn={wallet.connected} />
              <View style={styles.textContainer}>
                <Text style={styles.walletName}>{wallet.walledName}</Text>
                <Text style={styles.walletAddress}>{wallet.address ? wallet.address : "NO ADDRESS"}</Text>
              </View>

              <Pressable
                style={{
                  width: "36%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "space-around",
                  paddingHorizontal: 24,
                  backgroundColor: "black",
                  display: "flex",
                  flexDirection: "row",
                  borderTopRightRadius: 50,
                  borderBottomRightRadius: 50,
                }}
                onPress={
                  () => onPressActionFn() 
                  // () => removeWalletFn(wallet.address)
                    }
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  {(isConnected) ? "REMOVE" : "CONNECT"
                  }
                </Text>
                <MaterialCommunityIcons name="connection" size={16} color="white" />
              </Pressable>
            </View>
          );
        })} */}
      </View>



      <View style={styles.footerContainer}>
        {/* <Button label="Connect Wallet" onPressAction={() => authenticate()} /> */}
        <PrimaryBtnComponent label="Continue" onPress={() => authenticate()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({

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
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
