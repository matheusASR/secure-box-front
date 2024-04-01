import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginFormSchema } from "./loginFormSchema";
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
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { LoginContext } from "../../providers/loginContext";
import {colors} from "../../styles"

const LoginScreen = ({ navigation }: any) => {
  const { onSubmit, loading } = useContext(LoginContext);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {loading ? (
          <>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          </>
        ) : (
          <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={styles.inputContainer}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={styles.container}
                >
                  <Controller
                    control={control}
                    render={({ field }: any) => (
                      <TextInput
                        placeholder="Email*"
                        style={styles.input}
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="email-address"
                      />
                    )}
                    name="email"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                  <Controller
                    control={control}
                    render={({ field }: any) => (
                      <TextInput
                        placeholder="Senha*"
                        style={styles.input}
                        onChangeText={field.onChange}
                        value={field.value}
                        secureTextEntry
                      />
                    )}
                    name="password"
                    rules={{ required: true }}
                    defaultValue=""
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>
                      {errors.password.message}
                    </Text>
                  )}
                  <View style={styles.rowDirectionView}>
                    <Text style={styles.forgotPass}>Esqueceu sua senha?</Text>
                    <TouchableOpacity>
                      <Text style={styles.clickHere}>Clique aqui</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit(onSubmit)}
                  >
                    <Text style={styles.buttonText}>Entrar</Text>
                  </TouchableOpacity>
                  <Text style={styles.registerText}>
                    Ainda não possui cadastro?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Cadastro")}
                  >
                    <Text style={styles.registerLink}>Cadastre-se</Text>
                  </TouchableOpacity>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
          </>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;
