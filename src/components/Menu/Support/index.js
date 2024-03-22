import React from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const Support = () => {
  const navigation = useNavigation();

  const handleEmailPress = () => {
    Linking.openURL("mailto:matheusau2004@gmail.com");
  };

  const handleWhatsappPress = () => {
    Linking.openURL("https://api.whatsapp.com/send?phone=5511987111001");
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
        <Text style={styles.title}>Suporte</Text>
      </View>
      <View style={styles.btnView}>
        <Text style={styles.titleContact}>Como deseja nos contatar?</Text>
        <Text style={styles.titleContact}>Clique em uma das opções abaixo:</Text>
        <TouchableOpacity style={styles.button} onPress={handleEmailPress}>
          <Image
            source={require("../../../../assets/Email.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>matheusau2004@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleWhatsappPress}>
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

