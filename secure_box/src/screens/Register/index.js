import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { colors } from "../../styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSignUp = () => {
    // Implemente sua lógica de cadastro aqui
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Nome Completo"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Endereço"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />
              <TextInput
                placeholder="Telefone com DDD (XX) YYYYY-YYYY"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType="numeric"
                maxLength={11}
              />
              <TextInput
                placeholder="Data de Nascimento (XX/YY/ZZZZ)"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
              />
              <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Cadastrar-se</Text>
              </TouchableOpacity>

              <View style={styles.signInTextContainer}>
                <Text style={styles.accountText}>Já possui uma conta?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.signInLink}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  signInTextContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signInLink: {
    marginLeft: 5,
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  accountText: {
    fontSize: 15,
  },
});

export default RegisterScreen;
