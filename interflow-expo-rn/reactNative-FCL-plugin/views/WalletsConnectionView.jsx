import React, { useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";
import { useFcl } from "../contexts/FclContext";

export default function WalletsConnectionView() {
  const { authenticate, removeWallet, wallets } = useFcl();

  const removeWalletFn = useCallback(async (address) => {
    await removeWallet(address);
  }, []);

  return (
    <View style={styles.container}>
      {wallets.length == 0 ? (
        <Text>No wallets found</Text>
      ) : (
        wallets.map((wallet, index) => {
          return (
            <View style={{ border: "1px solid #000", padding: 8 }} key={index}>
              <Text>{wallet.walledName}</Text>
              <Text>{wallet.address}</Text>
              <Pressable
                style={{
                  width: 150,
                  height: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  backgroundColor: "#7e0094",
                }}
                onPress={() => removeWalletFn(wallet.address)}
              >
                <Text style={{ color: "#fff" }}>Remove Wallet</Text>
              </Pressable>
            </View>
          );
        })
      )}
      <View style={styles.footerContainer}>
        <Button label="LOGIN" onPressAction={() => authenticate()} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
