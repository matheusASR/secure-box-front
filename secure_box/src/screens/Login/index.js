import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  Platform,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { LoginContext } from "../../providers/loginContext";
import styles from "./styles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLogged } = useContext(LoginContext);

  const handleLogin = () => {
    // Implemente sua lógica de autenticação aqui
    setLogged(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.inputContainer}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.container}
            >
              <View style={styles.logoView}>
                <Image
                  style={styles.logo}
                  source={require("../../../assets/Logo.png")}
                />
              </View>
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
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}
              >
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>
              <Text style={styles.registerText}>
                Ainda não possui cadastro?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.registerLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
