import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

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

export default Support;
