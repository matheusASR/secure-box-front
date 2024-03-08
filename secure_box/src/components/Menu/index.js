import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { LoginContext } from "../../providers/loginContext"

const Menu = () => {
  const { setLogged } = useContext(LoginContext)

  const handleLogout = () => {
    setLogged(false)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../../assets/ProfileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>MATHEUS AUGUSTO SANTOS REGO</Text>
        <Text style={styles.email}>matheusau2004@gmail.com</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/ProfileImage.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/Shop.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minhas Compras</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Termos e Condições de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/Support.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../assets/Notification.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Image
            source={require("../../../assets/Exit.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  userInfo: {
    backgroundColor: "blue",
    paddingTop: 30,
    paddingBottom: 30,
    borderRadius: 5,
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
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
    marginBottom: 20
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});

export default Menu;
