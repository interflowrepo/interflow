import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import StripeService from "../services/StripeService";

export default function StripeComponent() {

  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const getAllStorageData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log("result", result);
      return result;
    } catch (e) {
      console.log("error", e);
    }
  };

  const fetchPaymentSheetParams = async (amount) => {
    let userId = 'a3341f16-f912-4213-9dd4-fffa9ac567c5'
    const data = await StripeService.createPaymentIntent(userId, amount);
    console.log("data", data);
    return data;
  };

  async function buy(userId, amount, tokensAmount) {
    const { paymentIntent, ephemeralKey, customer } = await fetchPaymentSheetParams(amount);

    const { error: errorInit } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Interflow App",
      allowsDelayedPaymentMethods: true,
      returnURL: "example://stripe-redirect"
    },
    );

    if (errorInit) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("error", error);
    } else {
        const response = await StripeService.addTokens(userId, tokensAmount);
        console.log("response", response)
        Alert.alert("Success", `Your payment was confirmed! Your new balance it's ${response.userTokens}`);
        console.log("success");
    }
  }

  const publishableKey =
    "pk_test_51MfOe3EFbOKoDaT5L6wpjDT4tL5ptYILn9BZ1po4JLSstXHqrzXmvbB02KHVXL4Xem1M5zhaQ7W0TBG8a54Xb0JR001WpO85nL";
  return (
    <View style={styles.container}>
      <StripeProvider publishableKey={publishableKey}>
        <Button onPress={() => buy(500, 100)} title="Buy $5" />
        <Button onPress={() => buy(3000, 200)} title="Buy $30" />
        <Button onPress={() => buy(5000, 300)} title="Buy $50" />
      </StripeProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePic: {
    width: 50,
    height: 50,
  },
  userInfo: {
    alignItems: "center",
    justifyContent: "center",
  },
});
