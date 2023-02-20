import React from "react";
import "./flow/config.js";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnboardingView from "./views/OnboardingView";
import CustomizeView from "./views/CustomizeView";
import HomeView from "./views/HomeView";
import SocialView from "./views/SocialView";
import GamesView from "./views/GamesView";
import WalletsConnectionView from "./views/WalletsConnectionView";
import PfpView from "./views/PfpView.jsx";
import UserContext, { useUser } from "./contexts/UserContext.jsx";
import FclContext from "./contexts/FclContext";
import HeaderComponent from "./components/HeaderComponent.jsx";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeView}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialView}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesView}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  navBar: {
    height: 29,
  },
});

export default function App() {
  return (
    <UserContext>
      <FclContext>
        {/* <HomeComponent /> */}
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Onboarding"
              options={{
                headerShown: false,
              }}
              component={OnboardingView}
            />
            <Stack.Screen
              name="Wallets"
              options={{
                headerShown: false,
              }}
              component={WalletsConnectionView}
            />
            <Stack.Screen
              name="Customize"
              component={CustomizeView}
              options={{
                // headerStyle: styles.navBar,
                headerBackground: () => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      // borderBottomWidth: 1,
                      // borderBottomColor: '#f0f0f0',
                    }}
                  >
                    <ImageBackground
                      source={require("./assets/avatar/bg(1).png")}
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        justifyContent: "center",
                      }}
                    ></ImageBackground>
                  </View>
                ),
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                // headerTitleStyle: {
                //   color: "white",
                // },
                // headerTitle: (props) => (
                //   <View>
                //     <Text style={{ color: "white" }}>{props.children}</Text>
                //   </View>
                // ),
              }}
            />
            <Stack.Screen
              name="Photo"
              component={PfpView}
              options={{
                // headerStyle: styles.navBar,
                headerBackground: () => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      // borderBottomWidth: 1,
                      // borderBottomColor: '#f0f0f0',
                    }}
                  >
                    <ImageBackground
                      source={require("./assets/avatar/bg(1).png")}
                      style={{
                        flex: 1,
                        resizeMode: "cover",
                        justifyContent: "center",
                      }}
                    ></ImageBackground>
                  </View>
                ),
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="App"
              component={AppNavigator}
              options={{
                // headerStyle: styles.navBar,
                headerBackground: () => <HeaderComponent />,
                // headerTintColor: "#fff",
                // headerTitleStyle: {
                //   fontWeight: "bold",
                // },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FclContext>
    </UserContext>
  );
}
