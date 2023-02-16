import * as fcl from "@onflow/fcl";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const queryState = async (authId) => {
  try {
    return await fetch(
      `https://flow-wallet-dev.blocto.app/api/flow/authn?l6n=http%3A%2F%2Flocalhost%3A3000&authenticationId=${authId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};

const requestOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const postExample = async (link) => {
  try {
    return await fetch(link, requestOptions)
      .then((response) => response.json())
      .then((data) => data);
  } catch (error) {
    console.error(error);
  }
};

export const storeBloctoData = async (value) => {
  try {
    let keys = await AsyncStorage.getAllKeys();

    for (key in keys) {
      let storedValue = AsyncStorage.getItem(key);
      if (storedValue == value) {
        return;
      }
    }
    let getBloctoKeysLength = keys.filter((key) => key.includes("Blocto"));
    await AsyncStorage.setItem(
      `Blocto.userAddr.${getBloctoKeysLength.length}`,
      value
    );
  } catch (e) {
    // saving error
  }
};

export const storeDapperData = async (value) => {
    try {
      let keys = await AsyncStorage.getAllKeys();
  
      for (key in keys) {
        let storedValue = AsyncStorage.getItem(key);
        if (storedValue == value) {
          return;
        }
      }
      let getBloctoKeysLength = keys.filter((key) => key.includes("Dapper"));
      await AsyncStorage.setItem(
        `Dapper.userAddr.${getBloctoKeysLength.length}`,
        value
      );
    } catch (e) {
      // saving error
    }
  };

export const getService = async (service) => {
  return await fcl.authenticate({ service });
};

export const getPostData = async (link) => {
  return await postExample(link);
};
