import * as Google from "expo-auth-session/providers/google";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID, IOS_CLIENT_ID } from "@env";
import UserService from "../services/UserService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [userAuthData, setUserAuthData] = useState();
  const [userFullData, setUserFullData] = useState();

  console.log("userAuthData from context", userAuthData);
  console.log("auth from context", auth);

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

  useEffect(() => {
    console.log("request REQUEST", request)
    console.log("request RESPONSE", response)
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

    console.log("DATA", data)

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
  };

  const value = {
    login,
    logout,
    auth,
    userAuthData,
    userFullData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
