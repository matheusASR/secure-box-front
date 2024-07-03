import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { WebView } from 'react-native-webview';

const Policies = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
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
        <Text style={styles.title}>Políticas de Privacidade</Text>
      </View>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://secbox-policies.vercel.app/SECBOX-%20POL%C3%8DTICA%20GERAL%20DE%20PRIVACIDADE%20E%20PROTE%C3%87%C3%83O%20DE%20DADOS%20(1).pdf' }}
        style={{ flex: 1 }}
        onLoadEnd={handleLoadEnd} 
      />
    </>
  );
};

export default Policies;

