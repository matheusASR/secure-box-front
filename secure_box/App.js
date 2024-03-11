import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/screens/Login";
import RegisterScreen from "./src/screens/Register";
import HomeScreen from "./src/components/Home";
import MenuScreen from "./src/screens/Menu";
import { LoginProvider, LoginContext } from "./src/providers/loginContext";
import ScreenPatternTab from "./src/components/ScreenPatternTab";
import ScreenPatternStack from "./src/components/ScreenPatternStack";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <LoginProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </LoginProvider>
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
              headerShown: false
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
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
