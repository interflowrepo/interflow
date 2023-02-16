import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";
import * as fcl from "@onflow/fcl";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getPostData,
  getService,
  queryState,
  storeBloctoData,
  storeDapperData,
} from "../utils/blocto/authUser";
import { injectedJavaScript } from "../utils/blocto/injectedJavaScript";
import AvailableWalletsView from "../components/AvailableWalletsView";

export const FclContext = createContext();

export default function FclProvider({ children }) {
  const [services, setServices] = useState(undefined);
  const [authId, setAuthId] = useState();
  const [linkUrl, setLinkUrl] = useState();
  const [openWalletWebView, setOpenWalletWebView] = useState(false);
  const [userAddr, setUserAddr] = useState();
  const [openAvailableWalletsView, setOpenAvailableWalletsView] =
    useState(false);

  useEffect(() => {
    fcl.discovery.authn.subscribe((res) => setServices(res.results));
  }, [services]);

  const updateLink = async (link) => {
    await setLinkUrl(link);
  };

  const authenticate = () => {
    setOpenAvailableWalletsView(true);
  };

  const closeAvailableWalletsView = () => {
    setOpenAvailableWalletsView(false);
  };

  const onPressActionFn = async (service) => {
    let authnData = await getService(service);

    if (authnData.service.provider.name == "Dapper Wallet") {
      let link = `${authnData.service.endpoint}?l6n=http%3A%2F%2Flocalhost%3A3000`;
      await updateLink(link);
    } else {
      let postResponse = await getPostData(authnData.service.endpoint);
      let link = `${postResponse.local.endpoint}?l6n=http%3A%2F%2Flocalhost%3A3000&channel=${postResponse.local.params.channel}&authenticationId=${postResponse.local.params.authenticationId}&fclVersion=${postResponse.local.params.fclVersion}`;
      await updateLink(link);
      console.log("postResponse", postResponse);
      setAuthId(postResponse.local.params.authenticationId);
    }
  };

  useEffect(() => {
    linkUrl && setOpenWalletWebView(!openWalletWebView);
  }, [linkUrl]);

  const checkAuthStatus = async () => {
    let statusData = await queryState(authId);
    console.log("statusData", statusData);
    if (statusData != undefined) {
      if (statusData.status == "APPROVED") {
        console.log("APPROVED");
        storeBloctoData(statusData.data.addr);
        setOpenWalletWebView(false);
        setOpenAvailableWalletsView(false);
      } else if (statusData.status == "PENDING") {
        setTimeout(() => {
          checkAuthStatus(authId);
        }, 1000);
      } else if (statusData.status == "DECLINED") {
        console.log("DECLINED");
        setOpenWalletWebView(false);
        setOpenAvailableWalletsView(false);
      }
    }
  };

  const getAllStoredData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log("ALL STORED DATA", result);
    } catch (e) {
      console.log("Async Storage error", e);
    }
  };

  const getStorageData = async () => {
    try {
      const value = await AsyncStorage.getItem("Blocto.userAddr");
      console.log("STOREDDD", value);
      setUserAddr(value);
    } catch (e) {
      console.log("Async Storage error", e);
    }
  };

  const getDapperWallet = (e) => {
    const objParsed = JSON.parse(e)
    let address = `0x${Object.values(objParsed)[3]}`
    storeDapperData(address)
    setOpenWalletWebView(false);
    setOpenAvailableWalletsView(false);
  }

  const value = {
    services,
    authId,
    linkUrl,
    userAddr,
    onPressActionFn,
    getStorageData,
    checkAuthStatus,
    getAllStoredData,
    authenticate,
    closeAvailableWalletsView,
  };

  return (
    <FclContext.Provider value={value}>
      {children}
      {openAvailableWalletsView && (
        <AvailableWalletsView
          services={services}
          userAddr={userAddr}
          onPressActionFn={onPressActionFn}
          getStorageData={getStorageData}
          getAllStoredData={getAllStoredData}
          closeAvailableWalletsView={closeAvailableWalletsView}
        />
      )}
      {openWalletWebView && (
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
                if(Object.values(e.nativeEvent.data).length == 697){
                    getDapperWallet(e.nativeEvent.data)
                } else {
                    checkAuthStatus();
                }
              console.log("Events: ", e.nativeEvent.data);
              console.log('LENGTH: ',Object.values(e.nativeEvent.data).length)
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
