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
    expoClientId: "853114116942-0e1blf79vsl1hnaj53dn92mnljfb975f.apps.googleusercontent.com",
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
    userInterflowAddress,
    userPfpImage,
    getUserData,
    updateUserCallingBackEnd,
    setUserFullData
  };

  return <AuthContext.Provider value={value}>
    {IsOpen && <AuthBottomSheet setIsOpen={setIsOpen} onPress={login}/>}
    {children}
  </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
