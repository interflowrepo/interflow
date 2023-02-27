import React, { useCallback, useMemo, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StripeService from "../services/StripeService";
import { usePaymentSheet } from "@stripe/stripe-react-native";
import PurchaseBtnComponent from "../components/PurchaseBtnComponent";
import GridListComponent from "../components/GridListComponent";
import { useAuth } from "../contexts/AuthContext";
import PrimaryBtnComponent from "../components/PrimaryBtnComponent";
import useUserData from "../hooks/useUserData";
import { params } from "@onflow/fcl";

const ProfileView = ({ navigation }) => {
  const { auth, setIsOpen, userId, updateUserData, logout, login } = useAuth();
  const { nfts } = useUserData();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  const fetchPaymentSheetParams = async (amount) => {
    // let userId = "a3341f16-f912-4213-9dd4-fffa9ac567c5";
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
      updateUserData(response);
      console.log("response", response);
      Alert.alert(
        "Success",
        `Your payment was confirmed! Your new balance it's ${response.userTokens}`
      );
      console.log("success");
    }
  }

  // let userId = "a3341f16-f912-4213-9dd4-fffa9ac567c5";

  const onPress = (item) => {
    // console.log("item", item);
    navigation.navigate({
      name: "UserCollection",
      params: {
        collection: item,
      },
    });
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 30, paddingTop: 40 }}>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "900", marginBottom: 4 }}>
          Buy Tokens
        </Text>
        <PurchaseBtnComponent
          quantity={10}
          price={2.99}
          color="lightgrey"
          width={220}
          onPress={
            !auth
              ? () => setIsOpen(true)
              : () => handleBuyTokens(userId, 299, 10)
          }
        />
        <PurchaseBtnComponent
          quantity={20}
          price={9.99}
          color="white"
          width={280}
          onPress={
            !auth
              ? () => setIsOpen(true)
              : () => handleBuyTokens(userId, 999, 20)
          }
        />
        <PurchaseBtnComponent
          quantity={50}
          price={59.99}
          color="gold"
          width={320}
          onPress={
            !auth
              ? () => setIsOpen(true)
              : () => handleBuyTokens(userId, 5999, 50)
          }
        />
      </View>
      <View style={{ height: 30 }} />
      <View
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "900",
            marginBottom: 4,
            height: 30,
          }}
        >
          Your Collections
        </Text>
        <GridListComponent
          data={nfts}
          numColumns={3}
          onPress={onPress}
          isProfile
        />
      </View>
      {auth ? (
        <PrimaryBtnComponent label={"LOGOUT"} onPress={logout} />
      ) : (
        <PrimaryBtnComponent label={"LOGIN / SIGNUP"} onPress={login} />
      )}
    </View>
  );
};

export default ProfileView;
