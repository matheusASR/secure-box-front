import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../../components/MainMenu";
import MyAccount from "../../components/MyAccount";

const Stack = createStackNavigator();

const MenuScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainMenu"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainMenu" component={MainMenu} />
      <Stack.Screen name="MyAccount" component={MyAccount} />
    </Stack.Navigator>
  );
};

export default MenuScreen;
