import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainMenu from "../../components/Menu/MainMenu";
import MyAccount from "../../components/Menu/MyAccount";
import Purchases from "../../components/Menu/Purchases";
import Terms from "../../components/Menu/Terms";
import Policies from "../../components/Menu/Policies";
import Notifications from "../../components/Menu/Notifications";
import Support from "../../components/Menu/Support";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../services/api";

const Stack = createStackNavigator();

const MenuScreen = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.statusText === "OK") {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário.", error);
      }
    };

    getProfile();
  }, []);

  return (
    <ScreenPatternStack>
      <Stack.Navigator
        initialRouteName="MainMenu"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          initialParams={{ user: { user } }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccount}
          initialParams={{ user: { user } }}
        />
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
