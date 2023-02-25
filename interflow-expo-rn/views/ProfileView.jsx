import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StripeService from "../services/StripeService";
import { usePaymentSheet } from "@stripe/stripe-react-native";

const ProfileView = () => {
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const fetchPaymentSheetParams = async (amount) => {
    let userId = "a3341f16-f912-4213-9dd4-fffa9ac567c5";
    const data = await StripeService.createPaymentIntent(userId, amount);
    console.log("data", data);
    return data;
  };

  async function handleBuyTokens(userId, amount, tokensAmount) {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams(amount);

    const { error: errorInit } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      merchantDisplayName: "Interflow App",
      allowsDelayedPaymentMethods: true,
      returnURL: "example://stripe-redirect",
    });

    if (errorInit) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      console.log("error", error);
    } else {
      const response = await StripeService.addTokens(userId, tokensAmount);
      console.log("response", response);
      Alert.alert(
        "Success",
        `Your payment was confirmed! Your new balance it's ${response.userTokens}`
      );
      console.log("success");
    }
  }

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

  let userId = "a3341f16-f912-4213-9dd4-fffa9ac567c5";

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 20 }}>
          Buy Tokens
        </Text>
        <TouchableOpacity onPress={() => handleBuyTokens(userId, 299, 10)}>
          <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              10 Tokens
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              $2.99
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBuyTokens(userId, 999, 20)}>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              20 Tokens
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              $9.99
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleBuyTokens(userId, 5999, 50)}>
        <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              50 Tokens
            </Text>
            <Text style={{ fontSize: 16, marginVertical: 10 }}>
              $59.99
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileView;
