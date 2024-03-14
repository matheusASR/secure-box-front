import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { HomeContext } from "../../providers/homeContext";
import CageList from "../../components/Home/CageList";
import { colors } from "../../styles";

const HomeScreen = () => {
  const { qrcode, setQrcode } = useContext(HomeContext);

  const handleQrcode = () => {
    // Implemente sua lógica de autenticação aqui
    setQrcode(true);
  };

  return (
    <>
      {qrcode ? (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Selecione a gaiola que deseja utilizar:</Text>
          </View>
          <CageList />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
          <View style={styles.container}>
            <Image
              source={require("../../../assets/QRcode.png")}
              style={styles.buttonImage}
            />
            <TouchableOpacity style={styles.button} onPress={handleQrcode}>
              <Text style={styles.buttonText}>Acessar gaiola pelo QRcode</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    flexDirection: "row",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonImage: {
    width: 120,
    height: 120,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
});

export default HomeScreen;
