import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Alert, View } from "react-native";
import * as fcl from "@onflow/fcl";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPostData,
  getService,
  storeBloctoData,
  storeDapperData,
} from "../utils/authFclUser";
import { injectedJavaScript } from "../utils/blocto/injectedJavaScript";
import AvailableWalletsView from "../components/AvailableWalletsView";
import UserService from "../services/UserService";
import { useAuth } from "./AuthContext";

export const FclContext = createContext();

export default function FclProvider({ children }) {
  const [services, setServices] = useState(undefined);
  const [linkUrl, setLinkUrl] = useState();
  const [openWalletWebView, setOpenWalletWebView] = useState(false);
  const [userAddr, setUserAddr] = useState();
  const [openAvailableWalletsView, setOpenAvailableWalletsView] =
    useState(false);

  const { userId, updateUserData } = useAuth();

  console.log("USER ID", userId)

  useEffect(() => {
    fcl.discovery.authn.subscribe((res) => setServices(res.results));
    if (linkUrl != "" && linkUrl != undefined) {
      setOpenWalletWebView(true);
    }
  }, [services, linkUrl]);

  const updateLink = useCallback(async (link) => {
    await setLinkUrl(link);
  }, []);

  const authenticate = useCallback(() => {
    setOpenAvailableWalletsView(true);
  }, []);

  const closeAvailableWalletsView = useCallback(() => {
    setOpenAvailableWalletsView(false);
  }, []);

  const onPressActionFn = useCallback(async (service) => {
    let authnData = await getService(service);
    if (authnData.service.provider.name == "Dapper Wallet") {
      let link = `${authnData.service.endpoint}?l6n=http%3A%2F%2Flocalhost%3A3000`;
      await updateLink(link);
    } else {
      let postResponse = await getPostData(authnData.service.endpoint);
      let link = `${postResponse.local.endpoint}?l6n=http%3A%2F%2Flocalhost%3A3000&channel=${postResponse.local.params.channel}&authenticationId=${postResponse.local.params.authenticationId}&fclVersion=${postResponse.local.params.fclVersion}`;
      await updateLink(link);
      console.log("postResponse", postResponse);

      await checkAuthStatus(postResponse.local.params.authenticationId);
    }
  }, []);

  const queryState = async (authId) => {
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

  const checkAuthStatus = useCallback(async (authId) => {
    let statusData = await queryState(authId);
    console.log("statusData", statusData);
    if (statusData != undefined) {
      if (statusData.status == "APPROVED") {
        console.log("APPROVED");
        const key = 'bloctoAddress'
        await storeWallet(key, statusData.data.addr);
        setOpenWalletWebView(false);
        setOpenAvailableWalletsView(false);
        setServices(undefined);
        setLinkUrl("");
      } else if (statusData.status == "PENDING") {
        setTimeout(() => {
          checkAuthStatus(authId);
        }, 1000);
      } else if (statusData.status == "DECLINED") {
        console.log("DECLINED");
        setOpenWalletWebView(false);
        setOpenAvailableWalletsView(false);
        setServices(undefined);
        setLinkUrl("");
      }
    }
  }, []);

  const removeWallet = useCallback(async (walletKey) => {
    try {
      const data =
        walletKey == "Blocto"
          ? {
              bloctoAddress: null,
            }
          : {
              dapperAddress: null,
            };

      const result = await UserService.updateUserData(userId, data);
      console.log("result ------------", result)
      updateUserData(result);
      await AsyncStorage.setItem(
        "userFullData",
        JSON.stringify(result)
      );
      Alert.alert("Wallet removed successfully");
      console.log("wallet removed");
    } catch (e) {
      console.log("Async Storage error", e);
    }
  }, []);

  const storeWallet = useCallback(async (walletKey, walletAddress) => {
    try {
      const data = {
        [walletKey]: walletAddress,
      }

      const result = await UserService.updateUserData(userId, data);
      updateUserData(result);
      await AsyncStorage.setItem(
        "userFullData",
        JSON.stringify(result)
      );
      Alert.alert("Wallet added successfully");
      console.log("wallet Added");
    } catch (e) {
      console.log("Async Storage error", e);
    }
  }, []);

  const getDapperWallet = async (e) => {
    const objParsed = JSON.parse(e);
    let address = `0x${Object.values(objParsed)[3]}`;
    const key = 'dapperAddress'
    await storeWallet(key, address);
    setOpenWalletWebView(false);
    setOpenAvailableWalletsView(false);
    setServices(undefined);
    setLinkUrl("");
  };

  const value = {
    services,
    linkUrl,
    userAddr,
    onPressActionFn,
    checkAuthStatus,
    authenticate,
    closeAvailableWalletsView,
    removeWallet,
  };

  return (
    <FclContext.Provider value={value}>
      {children}
      {openAvailableWalletsView && (
        <AvailableWalletsView
          services={services}
          userAddr={userAddr}
          onPressActionFn={onPressActionFn}
          closeAvailableWalletsView={closeAvailableWalletsView}
          removeWalletFn={removeWallet}
        />
      )}
      {openWalletWebView && linkUrl != "" && (
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        >
          <WebView
            source={{
              uri: linkUrl,
            }}
            onMessage={async (e) => {
              if (JSON.parse(e.nativeEvent.data).name != null) {
                getDapperWallet(e.nativeEvent.data);
              }
              console.log("Events: ", e.nativeEvent.data);
            }}
            injectedJavaScriptForMainFrameOnly={true}
            injectedJavaScript={injectedJavaScript}
          />
        </View>
      )}
    </FclContext.Provider>
  );
}

export const useFcl = () => useContext(FclContext);
