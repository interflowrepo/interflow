import * as Google from "expo-auth-session/providers/google";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import UserService from "../services/UserService";
import AuthBottomSheet from "../components/AuthBottomSheet";
import { Alert } from "react-native";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [userAuthData, setUserAuthData] = useState();
  const [userFullData, setUserFullData] = useState();
  const [IsOpen, setIsOpen] = useState(false)

  console.log("userAuthData from context", userAuthData);
  console.log("auth from context", auth);
  console.log("userFullData from context", userFullData);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  const finishLogin = useCallback(async (token) => {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    userInfoResponse.json().then((data) => {
      console.log("DATAAAAAAAA", data)
      loginUser(data.id, data.email)
    });

  }, []);

  const updateUserData = useCallback(async (result) => {
    console.log("Update user ---- ", result)
    AsyncStorage.setItem("userFullData", JSON.stringify(result));
    setUserFullData(result);
  }, [])

  const updateUserCallingBackEnd = useCallback(async () => {
    let result = await UserService.getUserCollectionData(userId).then((res) => {
      return res;
    });
    console.log("Update user ---- ", result)

    AsyncStorage.setItem("userFullData", JSON.stringify(result));
    setUserFullData(result);
  }, [])

  const getUserData = useCallback(async () => {
    let result = await UserService.getUserCollectionData(userId).then((res) => {
      return res;
    });

    return result
  }, [])

  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      setAuth(response.authentication);
      AsyncStorage.setItem("auth", JSON.stringify(response.authentication));

      finishLogin(response.authentication.accessToken)
    }
    getPersistedAuth();
  }, [response]);

  async function registerForPushNotificationsAsync(userId) {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    const result = await UserService.updateUserData(userId, { expoToken: token });
    console.log('EXPO TOKEN!!',result);
  
    return token;
  }

  const getPersistedAuth = async () => {
    const authJsonValue = await AsyncStorage.getItem("auth");
    if (authJsonValue != null) {
      const authFromJson = JSON.parse(authJsonValue);
      setAuth(authFromJson);
      console.log(authFromJson);
    }

    const userAuthDataJsonValue = await AsyncStorage.getItem("userAuthData");
    if (userAuthDataJsonValue != null) {
      const userAuthDataFromJson = JSON.parse(userAuthDataJsonValue);
      setUserAuthData(userAuthDataFromJson);
    }

    const userFullDataJsonValue = await AsyncStorage.getItem("userFullData");
    if (userFullDataJsonValue != null) {
      const userFullDataFromJson = JSON.parse(userFullDataJsonValue);
      setUserFullData(userFullDataFromJson);
    }
  };

  const loginUser = async (authId, email) => {
    let data = {
      email: email,
      authId: authId,
    };

    let result = await UserService.postLogin(data).then((res) => {
      console.log("RES", res);
      return res;
    });

    AsyncStorage.setItem("userAuthData", JSON.stringify(data));
    AsyncStorage.setItem("userFullData", JSON.stringify(result));
    setUserFullData(result);
    console.log("RES", result);
    registerForPushNotificationsAsync(result.user.id)
    return result;
  };

  const login = () => {
    console.log("was here!")
    promptAsync({ useProxy: true, showInRecents: true });
  };

  const logout = async () => {
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    setAuth(undefined);
    setUserAuthData(undefined);
    setUserFullData(undefined);
    await AsyncStorage.removeItem("auth");
    await AsyncStorage.removeItem("userAuthData");
    await AsyncStorage.removeItem("userFullData");
    Alert.alert("Logged out successfully!")
  };

  const userId = useMemo(() => {
    return userFullData?.user.id;
  }, [userFullData]);

  const userNickname = useMemo(() => {
    return userFullData?.user.nickname;
  }, [userFullData]);

  const userInterflowAddress = useMemo(() => {
    return userFullData?.user.interflowAddress;
  }, [userFullData]);

  const userInterflowTokens = useMemo(() => {
    return userFullData?.user.interflowTokens;
  }, [userFullData]);

  const userPfpImage = useMemo(() => {
    return userFullData?.user.pfpImage;
  }, [userFullData]);

  const userEmail = useMemo(() => {
    return userFullData?.user.email;
  }, [userFullData]);

  const dapperAddress = useMemo(() => {
    return userFullData?.user.dapperAddress;
  }, [userFullData]);

  const bloctoAddress = useMemo(() => {
    console.log("userFullData?.user.bloctoAddress", userFullData?.user.bloctoAddress)
    return userFullData?.user.bloctoAddress;
  }, [userFullData]);


  const value = {
    login,
    logout,
    auth,
    userAuthData,
    userFullData,
    setIsOpen,
    updateUserData,
    userId,
    userInterflowTokens,
    userNickname,
    userEmail,
    userInterflowAddress,
    userPfpImage,
    getUserData,
    updateUserCallingBackEnd,
    setUserFullData,
    dapperAddress,
    bloctoAddress
  };

  return <AuthContext.Provider value={value}>
    {IsOpen && <AuthBottomSheet setIsOpen={setIsOpen} onPress={login}/>}
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
