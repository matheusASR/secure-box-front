import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginScreen from "./src/components/Login";
import RegisterScreen from "./src/components/Register";
import HomeScreen from "./src/components/Home";
import MenuScreen from "./src/components/Menu";
import { LoginProvider, LoginContext } from "./src/providers/loginContext";
import ScreenPattern from "./src/components/ScreenPattern";

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
        <ScreenPattern>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: "#FFF",
              tabBarStyle: {
                height: 60,
                backgroundColor: 'blue'
              },
              tabBarLabelStyle: {
                fontSize: 14,
                fontWeight: "bold",
                color: "#FFF",
              },
              tabBarHideOnKeyboard: true,
            }}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Menu" component={MenuScreen} />
          </Tab.Navigator>
        </ScreenPattern>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Cadastro"
            component={RegisterScreen}
            options={{ headerLeft: null }}
          />
        </Stack.Navigator>
      )}
    </>
  );
};

export default App;
