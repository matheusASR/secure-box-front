import React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { registerFormSchema } from "./registerFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";
import Toast from "react-native-root-toast";

const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    delete data.confirmPassword;

    try {
      const response = await api.post("/users", data);
      if (response.status === 201) {
        Toast.show("Cadastro realizado com sucesso! Você será redirecionado.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        setTimeout(() => {
          navigation.navigate("Login");
        }, 2000);
      } else {
        Toast.show("Erro ao cadastrar usuário. Verifique os dados e tente novamente.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch (error) {
      Toast.show(`Ocorreu um erro ao cadastrar o usuário: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
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
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Nome Completo*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Data de Nascimento*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="birthdate"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.birthdate && (
                <Text style={styles.errorText}>{errors.birthdate.message}</Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Telefone com DDD*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    keyboardType="numeric"
                    maxLength={11}
                  />
                )}
                name="cel"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.cel && (
                <Text style={styles.errorText}>{errors.cel.message}</Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Email*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
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
                render={({ field }) => (
                  <TextInput
                    placeholder="CPF*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    keyboardType="numeric"
                    maxLength={11}
                  />
                )}
                name="cpf"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.cpf && (
                <Text style={styles.errorText}>{errors.cpf.message}</Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
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
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Repetir Senha*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    secureTextEntry
                  />
                )}
                name="confirmPassword"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
              <Text style={styles.sectionText}>Endereço:</Text>
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Rua/Avenida*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="address.street"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.address?.street && (
                <Text style={styles.errorText}>
                  {errors.address.street.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Número*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                    keyboardType="numeric"
                  />
                )}
                name="address.number"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.address?.number && (
                <Text style={styles.errorText}>
                  {errors.address.number.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Cidade*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="address.city"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.address?.city && (
                <Text style={styles.errorText}>
                  {errors.address.city.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Estado*"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="address.state"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.address?.state && (
                <Text style={styles.errorText}>
                  {errors.address.state.message}
                </Text>
              )}
              <Controller
                control={control}
                render={({ field }) => (
                  <TextInput
                    placeholder="Complemento"
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="address.complement"
                rules={{ required: false }}
                defaultValue=""
              />
              {errors.address?.complement && (
                <Text style={styles.errorText}>
                  {errors.address.complement.message}
                </Text>
              )}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}
              >
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
