import * as fcl from "@onflow/fcl";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    if(keys.length == 0) {
      await AsyncStorage.setItem(
        `Blocto.userAddr.${keys.length}`,
        value
      );
    }

    for (let key of keys) {
      let storedValue = await AsyncStorage.getItem(key);
      if (storedValue == value) {
        return;
      } else {
        let getBloctoKeysLength = keys.filter((key) => key.includes("Blocto"));
        await AsyncStorage.setItem(
          `Blocto.userAddr.${getBloctoKeysLength.length}`,
          value
        );
      }
    }
  } catch (e) {
    console.log("ERROR",e)
  }
};

export const storeDapperData = async (value) => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    if(keys.length == 0) {
      await AsyncStorage.setItem(
        `Dapper.userAddr.${keys.length}`,
        value
      );
    }
    for (let key of keys) {
      let storedValue = await AsyncStorage.getItem(key);
      if (storedValue == value) {
        return;
      } else {
        let getBloctoKeysLength = keys.filter((key) => key.includes("Dapper"));
        await AsyncStorage.setItem(
          `Dapper.userAddr.${getBloctoKeysLength.length}`,
          value
        );
      }
    }
  } catch (e) {
    console.log("ERROR",e)
  }
};

export const getService = async (service) => {
  return await fcl.getStrategyData({service});
};

export const getPostData = async (link) => {
  return await postExample(link);
};
