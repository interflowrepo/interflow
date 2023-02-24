import React from "react";
import "./flow/config.js";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import OnboardingView from "./views/OnboardingView";
import CustomizeView from "./views/CustomizeView";
import HomeView from "./views/HomeView";
import SocialView from "./views/SocialView";
import GamesView from "./views/GamesView";
import RevealView from "./views/RevealView";
import WalletsConnectionView from "./views/WalletsConnectionView";
import PfpView from "./views/PfpView.jsx";
import LoginComponent from "./components/LoginComponent.jsx";
import AuthContext from "./contexts/AuthContext.jsx";
import UserContext, { useUser } from "./contexts/UserContext.jsx";
import FclContext from "./contexts/FclContext";
import HeaderComponent from "./components/HeaderComponent.jsx";
import UserDetailsView from "./views/UserDetailsView.jsx";
import MetaraceView from "./views/MetaraceView.jsx";
import UserCollectionView from "./views/UserCollectionView.jsx";
import NftDetailsView from "./views/NftDetailsView.jsx";
import EventDetailsView from "./views/EventDetailsView.jsx";
import InterspaceView from "./views/InterspaceView.jsx";
import ProfileView from "./views/ProfileView.jsx";
import PfpHeaderComponent from "./components/header/PfpHeaderComponent.jsx";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Device from 'expo-device';

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeView"
        component={HomeView}
        options={({ navigation, route }) => ({
          // headerStyle: styles.navBar,
          headerLeft: () => <PfpHeaderComponent navigation={navigation} />,
          headerBackground: () => <HeaderComponent />,
          headerTitle: "",
          headerBackVisible: false,
          // headerTintColor: "#fff",
          // headerTitleStyle: {
          //   fontWeight: "bold",
          // },

        })}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileView}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Reveal"
        component={RevealView}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Metarace"
        component={MetaraceView}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="EventDetails"
        component={EventDetailsView}

      />
      <HomeStack.Screen
        name="Interspace"
        component={InterspaceView}

      />
    </HomeStack.Navigator>
  );
}

const SocialStack = createNativeStackNavigator();

function SocialStackNavigator() {
  return (
    <SocialStack.Navigator>
      <SocialStack.Screen
        name="SocialView"
        component={SocialView}
        options={{
          headerShown: false,
        }}
      />
      <SocialStack.Screen
        name="UserDetails"
        component={UserDetailsView}
        options={{
          headerShown: false,
        }}
      />
      <SocialStack.Screen
        name="UserCollection"
        component={UserCollectionView}
        options={{
          headerShown: false,
        }}
      />
      <SocialStack.Screen
        name="NftDetails"
        component={NftDetailsView}
        options={{
          headerShown: false,
        }}
      />
    </SocialStack.Navigator>
  );
}

const GamesStack = createNativeStackNavigator();

function GamesStackNavigator() {
  return (
    <GamesStack.Navigator>
      <GamesStack.Screen
        name="GamesView"
        component={GamesView}
        options={{
          headerShown: false,
        }}
      />
    </GamesStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function AppNavigator() {

  const isIos = Device.osName === 'iOS';

  const CustomTabBarButton = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -44,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // ...styles.shadow,
      }}
      onPress={onPress}
    >
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 50,
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 10,
          borderColor: 'lightgrey',
          borderWidth: 0.5,
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarStyle: { position: 'absolute', height: isIos ? 120 : 90, bottom: -40, width: '100%' },
        tabBarBackground: () => (
          isIos ? <BlurView tint="dark" intensity={100} st yle={[StyleSheet.absoluteFill,
          ]} /> : <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginBottom: isIos ? 0 : 16,
          }, 
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-group" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginBottom: isIos ? 0 : 16,
          }, 
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Plus"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={"white"} size={size} />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,

          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Games"
        component={GamesStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-variant" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginBottom: isIos ? 0 : 16,
          }, 
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Game"
        component={GamesStackNavigator}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="gamepad-variant" color={color} size={size} />
          ),
          tabBarIconStyle: {
            marginBottom: isIos ? 0 : 16,
          }, 
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
    <AuthContext>
      <UserContext>
        <FclContext>
          {/* <LoginComponent /> */}
          <NavigationContainer>
            <Stack.Navigator>
              {/* <Stack.Screen
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
            /> */}
              {/* <Stack.Screen
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
              /> */}
              <Stack.Screen
                name="App"
                component={AppNavigator}
                options={{
                  headerShown: false,
                }}

              />
            </Stack.Navigator>
          </NavigationContainer>
        </FclContext>
      </UserContext>
    </AuthContext>
  );
}
