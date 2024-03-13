import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { LoginContext } from "../../../providers/loginContext";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../styles";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    backgroundColor: colors.primary,
    paddingVertical: "10%",
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    shadowColor: '#000', 
    shadowOffset: {
      width: 0, 
      height: 2, 
    },
    shadowOpacity: 0.5, 
    shadowRadius: 4, 
    elevation: 5, 
  },
  fullName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  email: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    height: "70%",
    paddingHorizontal: 15
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default MainMenu;
