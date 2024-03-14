import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../styles";

const Support = () => {
  const navigation = useNavigation();

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
        <Text style={styles.title}>Suporte</Text>
      </View>
      <View style={styles.btnView}>
        <Text style={styles.titleContact}>Como deseja nos contatar?</Text>
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
  backBtn: {
    position: "absolute",
    left: 20,
  },
  backBtnImage: {
    width: 40,
    height: 40,
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
  },
  titleContact: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  }
});

export default Support;
