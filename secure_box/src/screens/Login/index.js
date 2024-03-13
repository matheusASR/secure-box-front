import React, { useContext, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
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
import { colors } from "../../styles";

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
                  source={require("../../../assets/ClosedPadlock.png")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
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
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  registerLink: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
  },
  logoView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -160
  },
  logo: {
    width: 100,
    height: 100,
  },
});

export default LoginScreen;
