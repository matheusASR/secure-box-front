import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { LoginContext } from "../../../providers/loginContext";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import ExitModal from "./ExitModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";
import Toast from "react-native-root-toast";

const MainMenu = () => {
  const [ user, setUser ] = useState({});
  const { setLogged } = useContext(LoginContext)

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        Toast.show(`Erro ao buscar dados do usuário: ${error}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        setLogged(false)
      }
    };

    getProfile();
  }, []);
  const navigation = useNavigation();
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleLogout = () => {
    setIsExitModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    setIsExitModalVisible(false);
    await AsyncStorage.removeItem("@secbox:TOKEN");
    setLogged(false);
  };

  const handleCloseModal = () => {
    setIsExitModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../../../assets/ProfileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MyAccount")}
        >
          <Image
            source={require("../../../../assets/ProfileImage.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Purchases")}
        >
          <Image
            source={require("../../../../assets/Shop.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minhas Compras</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Terms")}
        >
          <Image
            source={require("../../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Termos e Condições de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Policies")}
        >
          <Image
            source={require("../../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Support")}
        >
          <Image
            source={require("../../../../assets/Support.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            source={require("../../../../assets/Notification.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Image
            source={require("../../../../assets/Exit.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      {isExitModalVisible && (
        <ExitModal
          isVisible={isExitModalVisible}
          onClose={handleCloseModal}
          onConfirm={handleConfirmLogout}
        />
      )}
    </View>
  );
};

export default MainMenu;
