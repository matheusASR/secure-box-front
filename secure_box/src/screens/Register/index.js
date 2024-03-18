import React, { useState } from "react";
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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");

  const handleSignUp = () => {
    const userData = {
      fullName,
      birthdate,
      phoneNumber,
      email,
      password,
      passwordConfirm,
      address: {
        street,
        number,
        city,
        state,
        complement,
      },
    };

    console.log(userData);

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
              <Text style={styles.sectionText}>Dados Pessoais:</Text>
              <TextInput
                placeholder="Nome Completo*"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />
              <TextInput
                placeholder="Data de Nascimento (XX/YY/ZZZZ)*"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
                keyboardType="numeric"
                maxLength={10}
              />
              <TextInput
                placeholder="Telefone com DDD"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                keyboardType="numeric"
                maxLength={11}
              />
              <TextInput
                placeholder="Email*"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Senha*"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <TextInput
                placeholder="Repetir Senha*"
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry
                style={styles.input}
              />
              <Text style={styles.sectionText}>Endereço:</Text>
              <TextInput
                placeholder="Rua*"
                value={street}
                onChangeText={setStreet}
                style={styles.input}
              />
              <TextInput
                placeholder="Número*"
                value={number}
                onChangeText={setNumber}
                style={styles.input}
              />
              <TextInput
                placeholder="Cidade*"
                value={city}
                onChangeText={setCity}
                style={styles.input}
              />
              <TextInput
                placeholder="Estado*"
                value={state}
                onChangeText={setState}
                style={styles.input}
              />
              <TextInput
                placeholder="Complemento"
                value={complement}
                onChangeText={setComplement}
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

