import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/screens/Home";
import MenuScreen from "./src/screens/Menu";
import { LoginProvider, LoginContext } from "./src/providers/loginContext";
import ScreenPatternTab from "./src/components/ScreenPattern/ScreenPatternTab";
import ScreenPatternStack from "./src/components/ScreenPattern/ScreenPatternStack";
import { HomeProvider } from "./src/providers/homeContext";
import { RegisterProvider } from "./src/providers/registerContext";
import InUse from "./src/screens/InUse";
import { InUseProvider } from "./src/providers/inUseContext";
import { colors } from "./src/styles";
import { Image } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
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
  );
};

const AppNavigation = () => {
  const { logged } = React.useContext(LoginContext);

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
                backgroundColor: colors.primary,
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
              },
              tabBarHideOnKeyboard: true,
              headerStyle: {
                backgroundColor: colors.primary,
                shadowColor: "#000", 
                shadowOffset: {
                  width: 0, 
                  height: 2, 
                },
                shadowOpacity: 0.5, 
                shadowRadius: 4, 
                elevation: 5, 
              },
              headerTintColor: "white",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              tabBarIcon: () => {
                let iconName;

                if (route.name === "Home") {
                  iconName = require("./assets/Home.png");
                } else if (route.name === "Menu") {
                  iconName = require("./assets/Menu.png");
                } else if (route.name === "Em uso") {
                  iconName = require("./assets/Cage.png");
                }

                return (
                  <Image source={iconName} style={{ width: 30, height: 30 }} />
                );
              },
            })}
          >
            <Tab.Screen
              name="Home"
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
            <Stack.Screen
              name="Cadastro"
              component={RegisterScreen}
              options={{ headerLeft: null }}
            />
          </Stack.Navigator>
        </ScreenPatternStack>
      )}
    </>
  );
};

export default App;
