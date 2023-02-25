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
  storeBloctoData,
  storeDapperData,
} from "../utils/authFclUser";
import { injectedJavaScript } from "../utils/blocto/injectedJavaScript";
import AvailableWalletsView from "../components/AvailableWalletsView";

export const FclContext = createContext();

const availableWallets = [
  {
    walledName: "Dapper Wallet",
    connected: false,
    address: "",
  },
  {
    walledName: "Blocto",
    connected: false,
    address: "",
  },
]

export default function FclProvider({ children }) {
  const [services, setServices] = useState(undefined);
  const [linkUrl, setLinkUrl] = useState();
  const [openWalletWebView, setOpenWalletWebView] = useState(false);
  const [userAddr, setUserAddr] = useState();
  const [openAvailableWalletsView, setOpenAvailableWalletsView] =
    useState(false);
  const [wallets, setWallets] = useState(availableWallets);

  useEffect(() => {
    fcl.discovery.authn.subscribe((res) => setServices(res.results));
    if (linkUrl != "" && linkUrl != undefined) {
      setOpenWalletWebView(true);
    }
    getWallets();
  }, [services, linkUrl]);

  const getWallets = async () => {
    const connectedWallets = await getAllStoredData();
    console.log("connectedWallets", connectedWallets);

    const newWallets = wallets.map((wallet) => {
      const connectedWallet = connectedWallets.find(
        (connectedWallet) => connectedWallet.walledName == wallet.walledName
      );

      console.log("the connectedWallet", connectedWallet)
      if (connectedWallet) {
        return {
          ...wallet,
          connected: true,
          address: connectedWallet.address,
        };
      } else {
        return {
          ...wallet,
          connected: false,
          address: "",
        };
      }
    });

    console.log("newWallets", newWallets);

    setWallets(newWallets);
  };

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
        await storeBloctoData(statusData.data.addr);
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

  const removeWallet = useCallback(async (walletAddress) => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      result.map((item) => {
        if (item[1] == walletAddress) {
          AsyncStorage.removeItem(item[0]);
        }
      });
      await getWallets();
      console.log("wallet removed");
    } catch (e) {
      console.log("Async Storage error", e);
    }
  }, []);

  const getAllStoredData = useCallback(async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      console.log("wallets", result);
      let walletsAddress = [];
      result.map((item) => {
        if (item[0].includes("Blocto.userAddr")) {
          let walletData = {
            walledName: "Blocto",
            address: item[1],
          };
          walletsAddress.push(walletData);
        } else if (item[0].includes("Dapper.userAddr")) {
          let walletData = {
            walledName: "Dapper",
            address: item[1],
          };
          walletsAddress.push(walletData);
        }
      });
      return walletsAddress;
    } catch (e) {
      console.log("Async Storage error", e);
    }
  }, []);

  const getStorageData = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem("Blocto.userAddr");
      setUserAddr(value);
    } catch (e) {
      console.log("Async Storage error", e);
    }
  }, []);

  const getDapperWallet = async (e) => {
    const objParsed = JSON.parse(e);
    let address = `0x${Object.values(objParsed)[3]}`;
    await storeDapperData(address);
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
    getStorageData,
    checkAuthStatus,
    getAllStoredData,
    authenticate,
    closeAvailableWalletsView,
    removeWallet,
    wallets,
  };

  return (
    <FclContext.Provider value={value}>
      {children}
      {openAvailableWalletsView && (
        <AvailableWalletsView
          wallets={wallets}
          services={services}
          userAddr={userAddr}
          onPressActionFn={onPressActionFn}
          getStorageData={getStorageData}
          getAllStoredData={getAllStoredData}
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
