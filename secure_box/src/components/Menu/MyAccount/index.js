import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../styles";

const MyAccount = () => {
  const navigation = useNavigation();

  const editProfile = () => {
    // Lógica para alterar a senha
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("MainMenu")}
        >
          <Image
            style={styles.backBtnImage}
            source={require("../../../../assets/BackBtn.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Minha Conta</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.dataContainer}>
          <View style={styles.dataContainerTop}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.data}>Matheus Augusto Santos Rego</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.data}>matheusau2004@gmail.com</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.data}>(11) 98711-1001</Text>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.data}>09/03/2004</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.updateBtn} onPress={editProfile}>
              <Text style={styles.updateBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
  },
  title: {
    color: "white",
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    width: "100%",
    textAlign: "start",
    backgroundColor: colors.primary,
    paddingLeft: 20,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10
  },
  backBtn: {
    position: "absolute",
    left: 20,
  },
  backBtnImage: {
    width: 40,
    height: 40,
  },
  updateBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  updateBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dataContainer: {
    padding: 20,
    width: "90%",
    height: 450,
    justifyContent: "space-between",
  },
  dataContainerTop: {
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    fontSize: 16,
    backgroundColor: "#E0E0E0",
    width: "100%",
    paddingVertical: 10,
    textAlign: "center",
  }
});

export default MyAccount;
