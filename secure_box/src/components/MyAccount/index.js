import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import ScreenPattern from "../ScreenPatternTab";
import { useNavigation } from "@react-navigation/native";

const MyAccount = () => {
  const navigation = useNavigation();

  const handlePasswordChange = () => {
    // Lógica para alterar a senha
  };

  const handleSecurityCodeChange = () => {
    // Lógica para alterar o código de segurança
  };

  const handlePhoneNumberChange = () => {
    // Lógica para alterar o número de telefone
  };

  const handleDeleteAccount = () => {
    // Lógica para deletar a conta
  };

  return (
    <ScreenPattern>
      <Button
          title="< Menu"
          onPress={() => navigation.navigate("MainMenu")}
        />
      <View style={styles.header}>
        <Text style={styles.title}>Minha Conta</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Nome: MATHEUS AUGUSTO SANTOS REGO</Text>
        <Text style={styles.label}>Email: matheusau2004@gmail.com</Text>
        <Text style={styles.label}>Telefone: (11) 98711-1001</Text>
        <Text style={styles.label}>Data de Nascimento: 09/03/2004</Text>
        <View style={styles.buttonContainer}>
          <Button title="Alterar Senha" onPress={handlePasswordChange} />
          <Button
            title="Alterar Código de Segurança"
            onPress={handleSecurityCodeChange}
          />
          <Button
            title="Alterar Número de Telefone"
            onPress={handlePhoneNumberChange}
          />
          <Button title="Deletar Conta" onPress={handleDeleteAccount} />
        </View>
      </View>
    </ScreenPattern>
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
    color: "white",
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default MyAccount;
