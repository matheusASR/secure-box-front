import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LoginContext } from "../../../providers/loginContext";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const MainMenu = () => {
  const { setLogged } = useContext(LoginContext);
  const navigation = useNavigation();

  const handleLogout = () => {
    setLogged(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../../../assets/ProfileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>MATHEUS AUGUSTO SANTOS REGO</Text>
        <Text style={styles.email}>matheusau2004@gmail.com</Text>
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
    </View>
  );
};

export default MainMenu;
