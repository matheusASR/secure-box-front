import React, { useState } from "react";
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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

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

  const handleSendCode = () => {
    // Aqui você precisa enviar uma solicitação para o seu backend para gerar e enviar um código para o email fornecido
    // Esta é uma simulação de envio de código por email
    const generateAndSendCode = async () => {
      try {
        // Lógica simulada para gerar um código de recuperação (número aleatório de 6 dígitos)
        const recoveryCode = Math.floor(100000 + Math.random() * 900000);

        // Simulação de uma chamada de API para enviar o código por email
        // Substitua este trecho com sua lógica real de backend para enviar o código por email
        // Por exemplo, você pode usar uma API REST ou Firebase Cloud Functions
        // Aqui, vamos apenas exibir um alerta com o código gerado
        const [message, toastConfig] = generateToastConfig(`Código enviado!`);
        Toast.show(message, toastConfig);

        // Limpar o campo de email após o envio
        setEmail("");
      } catch (error: any) {
        const [message, toastConfig] = generateToastConfig(`Erro ao enviar código: ${error.response.data.message}`);
        Toast.show(message, toastConfig);
      }
    };

    // Chamada da função de simulação de envio de código por email
    generateAndSendCode();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.contentContainer}>
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
            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

