import React from "react";
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Support = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Button
          title="< Menu"
          onPress={() => navigation.navigate("MainMenu")}
        />
        <Text style={styles.title}>Suporte</Text>
      </View>
      <View style={styles.btnView}>
        <Text style={styles.title}>Como deseja nos contatar?</Text>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../../assets/Email.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>matheusau2004@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../../../assets/Whatsapp.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>(11) 98711-1001</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 20,
    textAlign: "center"
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
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
  buttonImage: {
    width: 30,
    height: 30,
  },
  btnView: {
    marginTop: 60
  }
});

export default Support;
