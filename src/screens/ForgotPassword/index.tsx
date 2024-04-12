import React, { useContext, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../providers/loginContext";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [codeLogin, setCodeLogin] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const { setLogged } = useContext(LoginContext)

  const generateToastConfig = (message: any) => {
    return [
      message,
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      },
    ];
  };

  function generateSixDigitPassword() {
    let password = '';
    for (let i = 0; i < 6; i++) {
      const digit = Math.floor(Math.random() * 10); 
      password += digit;
    }
    return password;
  }

  const handleSendCode = async () => {
    const code = generateSixDigitPassword()
    setCode(code)
    const payload = {
      email: email.toLowerCase(),
      code: code
    }
    try {
      const response = await api.patch("/users", payload);
      if (response.status === 200) {
        setEmailSent(true)
        const [message, toastConfig] = generateToastConfig(
          "Código enviado com sucesso!"
        );
        Toast.show(message, toastConfig);
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao enviar código de acesso: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    }
  };

  const loginAlt = async () => {
    if (codeLogin === code) {
      try {
        const response = await api.post("/login/code", {
          email: email.toLowerCase()
        });
        if (response.status === 200) {
          await AsyncStorage.setItem("@secbox:TOKEN", response.data.token);
          setLogged(true);
          const [message, toastConfig] = generateToastConfig(
            "Login realizado com sucesso! Você será redirecionado."
          );
          Toast.show(message, toastConfig);
        }
      } catch (error: any) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao fazer login: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
      }
    } else {
      const [message, toastConfig] = generateToastConfig(
        `Código inválido!`
      );
      Toast.show(message, toastConfig);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.contentContainer}>
            {emailSent ? (
              <>
                <Text style={styles.subtitle}>
                  Por favor, insira o código enviado por email:
                </Text>
                <TextInput
                  style={styles.input}
                  value={codeLogin}
                  onChangeText={setCodeLogin}
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => loginAlt}
                >
                  <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.title}>Esqueceu a senha?</Text>
                <Text style={styles.subtitle}>
                  Por favor, insira o email associado à sua conta:
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email*"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSendCode}
                >
                  <Text style={styles.buttonText}>Enviar código</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
