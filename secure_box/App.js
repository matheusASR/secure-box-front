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
            screenOptions={{
              tabBarActiveTintColor: "#FFF",
              tabBarStyle: {
                height: 60,
                backgroundColor: "blue",
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#FFF",
              },
              tabBarHideOnKeyboard: true,
              headerShown: false,
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
            <Tab.Screen name="In Use" component={InUse} />
          </Tab.Navigator>
        </ScreenPatternTab>
      ) : (
        <ScreenPatternStack>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
              headerShown: false,
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
