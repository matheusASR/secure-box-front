import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Platform,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
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
                placeholder="Data de Nascimento (XX/YY/ZZZZ)"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
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
                placeholder="Endereço"
                value={address}
                onChangeText={setAddress}
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
                placeholder="Repetir Senha"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                style={styles.input}
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

export default RegisterScreen;
