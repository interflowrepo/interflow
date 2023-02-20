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

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  const [userAuthData, setUserAuthData] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    expoClientId: EXPO_CLIENT_ID,
  });

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      setAuth(response.authentication);

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          "auth",
          JSON.stringify(response.authentication)
        );
      };
    persistAuth();
    getUserData();
    }
  }, [response]);

  useEffect(async () => {
    if (!userAuthData) {
      let userAuthData = await AsyncStorage.getItem("userAuthData");
      console.log("userAuthData from async storage", userAuthData);
      setUserAuthData(JSON.parse(userAuthData));
    }
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem("auth");
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue);
        setAuth(authFromJson);
        console.log(authFromJson);

        let tokenExpired = !AuthSession.TokenResponse.isTokenFresh({
          expiresIn: authFromJson.expiresIn,
          issuedAt: authFromJson.issuedAt,
        });

        if (tokenExpired && !userAuthData) {
          console.log(
            "token expired and no user data, logging out",
            userAuthData
          );
          await logout();
        }
      }
    };
    await getPersistedAuth();
  }, []);

  const getUserData = async () => {
    console.log('was here inside getuser data')
    console.log(auth)
    if(auth){
        let userInfoResponse = await fetch(
          "https://www.googleapis.com/userinfo/v2/me",
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` },
          }
        );
        userInfoResponse.json().then((data) => {
          console.log("data", data);
          setUserAuthData({ id: data.id, email: data.email });
          AsyncStorage.setItem("userAuthData", JSON.stringify({ id: data.id, email: data.email }));
        });
    } else {
        logout()
    }
  };

  const login = async () => {
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
    await AsyncStorage.removeItem("auth");
    await AsyncStorage.removeItem("userAuthData");
  };

  const value = {
    login,
    logout,
    auth,
    getUserData,
    userAuthData,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
