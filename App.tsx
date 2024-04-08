import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import MenuScreen from "./src/screens/Menu";
import { LoginContext, LoginProvider } from "./src/providers/loginContext";
import ScreenPatternTab from "./src/components/ScreenPattern/ScreenPatternTab";
import ScreenPatternStack from "./src/components/ScreenPattern/ScreenPatternStack";
import { HomeProvider } from "./src/providers/homeContext";
import { RegisterProvider } from "./src/providers/registerContext";
import InUse from "./src/screens/InUse";
import { InUseProvider } from "./src/providers/inUseContext";
import { colors } from "./src/styles";
import { Image } from "react-native";
import { RootSiblingParent } from "react-native-root-siblings";
import ForgotPasswordScreen from "./src/screens/ForgotPassword";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <RootSiblingParent>
      <RegisterProvider>
        <LoginProvider>
          <HomeProvider>
            <InUseProvider>
              <NavigationContainer>
                <AppNavigation />
              </NavigationContainer>
            </InUseProvider>
          </HomeProvider>
        </LoginProvider>
      </RegisterProvider>
    </RootSiblingParent>
  );
};

const AppNavigation = () => {
  const { logged } = useContext(LoginContext);

  return (
    <>
      {logged ? (
        <ScreenPatternTab>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: "#FFF",
              tabBarInactiveTintColor: "#000",
              tabBarStyle: {
                height: 60,
                backgroundColor: colors.primary,
                paddingTop: 5,
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
              },
              tabBarHideOnKeyboard: true,
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 18,
              },
              tabBarIcon: ({ focused }) => {
                let iconName;

                if (route.name === "Início") {
                  iconName = focused
                    ? require("./assets/HomeFocused.png")
                    : require("./assets/Home.png");
                } else if (route.name === "Menu") {
                  iconName = focused
                    ? require("./assets/MenuFocused.png")
                    : require("./assets/Menu.png");
                } else if (route.name === "Em uso") {
                  iconName = focused
                    ? require("./assets/CageFocused.png")
                    : require("./assets/Cage.png");
                }

                return (
                  <Image source={iconName} style={{ width: 30, height: 30 }} />
                );
              },
            })}
          >
            <Tab.Screen
              name="Início"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Menu"
              component={MenuScreen}
              options={{ headerShown: false }}
            />
            <Tab.Screen name="Em uso" component={InUse} />
          </Tab.Navigator>
        </ScreenPatternTab>
      ) : (
        <ScreenPatternStack>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={RegisterScreen} />
            <Stack.Screen name="Senha" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        </ScreenPatternStack>
      )}
    </>
  );
};

export default App;
