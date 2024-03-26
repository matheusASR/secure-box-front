import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../../components/Menu/MainMenu";
import MyAccount from "../../components/Menu/MyAccount";
import Purchases from "../../components/Menu/Purchases";
import Terms from "../../components/Menu/Terms";
import Policies from "../../components/Menu/Policies";
import Notifications from "../../components/Menu/Notifications";
import Support from "../../components/Menu/Support";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";
import PaymentMethod from "../../components/Menu/PaymentMethod";

const Stack = createStackNavigator();

const MenuScreen = () => {
  return (
    <ScreenPatternStack>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainMenu" component={MainMenu} />
        <Stack.Screen name="MyAccount" component={MyAccount} />
        <Stack.Screen name="PaymentMethods" component={PaymentMethod} />
        <Stack.Screen name="Purchases" component={Purchases} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="Policies" component={Policies} />
        <Stack.Screen name="Support" component={Support} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </ScreenPatternStack>
  );
};

export default MenuScreen;
