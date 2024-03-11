import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Image
          source={require("../../../assets/QRcode.png")}
          style={styles.buttonImage}
        />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar gaiola pelo QRcode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    gap: 20
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
    backgroundColor: "blue",
    paddingHorizontal: 10,
    paddingVertical: 10
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
