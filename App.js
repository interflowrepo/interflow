import React from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingView from "./views/OnboardingView";
import CustomizeView from "./views/CustomizeView";
import PrimaryBtn from "./components/PrimaryBtn";
// import LinearGradient from "react-native-linear-gradient";

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  navBar: {
    height: 29,
  },
});

function App() {
  return (
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
          name="Customize"
          component={CustomizeView}
          options={{
            // headerStyle: styles.navBar,
            headerBackground: () => (
              <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                // borderBottomWidth: 1,
                // borderBottomColor: '#f0f0f0',
              }}
            >
             <ImageBackground
              source={require('./assets/avatar/bg(1).png')}
              style={{
                flex: 1,
                resizeMode: 'cover',
                justifyContent: 'center',
              }}
            >
            </ImageBackground>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
