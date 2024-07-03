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
  ActivityIndicator,
  Switch,
} from "react-native";
import styles from "./styles";
import { useForm, Controller } from "react-hook-form";
import { registerFormSchema } from "./registerFormSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-root-toast";
import { api } from "../../services/api";
import { colors } from "../../styles";
import axios from "axios";

const RegisterScreen = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingZipCode, setIsLoadingZipCode] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerFormSchema),
  });

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

  const fetchAddressByCep = async (cep: string) => {
    setIsLoadingZipCode(true);
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf } = response.data;
      setValue("address.street", logradouro);
      setValue("address.neighborhood", bairro); // Adicionando o bairro
      setValue("address.city", localidade);
      setValue("address.state", uf);
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Erro ao buscar CEP: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    } finally {
      setIsLoadingZipCode(false);
    }
  };

  const onSubmit = async (data: any) => {
    if (accepted) {
      data.email = data.email.toLowerCase();
      setIsLoading(true);
      try {
        const response = await api.post("/users", data);
        if (response.status === 201) {
          const [message, toastConfig] = generateToastConfig(
            "Cadastro realizado com sucesso! Você será redirecionado."
          );
          Toast.show(message, toastConfig);
          navigation.navigate("Login");
        } else {
          const [message, toastConfig] = generateToastConfig(
            "Erro ao cadastrar usuário. Verifique os dados e tente novamente."
          );
          Toast.show(message, toastConfig);
        }
      } catch (error: any) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao cadastrar o usuário: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    } else {
      const [message, toastConfig] = generateToastConfig(
        `Aceite os termos e condições de uso para prosseguir!`
      );
      Toast.show(message, toastConfig);
    }
  };

  const handleChangeText = (text: any) => {
    let formattedText = text.replace(/\D/g, "");
    if (formattedText.length > 2) {
      formattedText = `${formattedText.substring(
        0,
        2
      )}/${formattedText.substring(2)}`;
    }
    if (formattedText.length > 5) {
      formattedText = `${formattedText.substring(
        0,
        5
      )}/${formattedText.substring(5)}`;
    }
    setValue("birthdate", formattedText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <>
            {isLoading ? (
              <>
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                </View>
              </>
            ) : (
              <>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.sectionText}>Dados Pessoais:</Text>
                    <Controller
                      control={control}
                      render={({ field }: any) => (
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
                      <Text style={styles.errorText}>
                        {errors.name.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      render={({ field }: any) => (
                        <TextInput
                          placeholder="Data de Nascimento*"
                          style={styles.input}
                          onChangeText={handleChangeText}
                          value={field.value}
                          keyboardType="numeric"
                          maxLength={10}
                        />
                      )}
                      name="birthdate"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    {errors.birthdate && (
                      <Text style={styles.errorText}>
                        {errors.birthdate.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      render={({ field }: any) => (
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
                      render={({ field }: any) => (
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
                      <Text style={styles.errorText}>
                        {errors.email.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      render={({ field }: any) => (
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

                    <View style={styles.passwordReqView}>
                      <Text style={styles.passwordReqTitle}>
                        A senha deve conter:
                      </Text>
                      <Text style={styles.passwordReq}>
                        Pelo menos 8 caracteres.
                      </Text>
                      <Text style={styles.passwordReq}>
                        Pelo menos 1 letra maiúscula.
                      </Text>
                      <Text style={styles.passwordReq}>
                        Pelo menos 1 número.
                      </Text>
                      <Text style={styles.passwordReq}>
                        Pelo menos 1 caracter especial.
                      </Text>
                    </View>

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

                    <Text style={styles.sectionText}>Endereço:</Text>
                    <Controller
                      control={control}
                      render={({ field }: any) => (
                        <TextInput
                          placeholder="CEP*"
                          style={styles.input}
                          onChangeText={(value) => {
                            field.onChange(value);
                            if (value.length === 8) {
                              fetchAddressByCep(value);
                            }
                          }}
                          value={field.value}
                          keyboardType="numeric"
                          maxLength={8}
                        />
                      )}
                      name="address.zipCode"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    {errors.address?.zipCode && (
                      <Text style={styles.errorText}>
                        {errors.address.zipCode.message}
                      </Text>
                    )}
                    {isLoadingZipCode && (
                      <>
                        <View style={styles.loadingContainerZipCode}>
                          <ActivityIndicator
                            size="large"
                            color={colors.primary}
                          />
                        </View>
                      </>
                    )}
                    <Controller
                      control={control}
                      render={({ field }: any) => (
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
                      render={({ field }: any) => (
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
                      render={({ field }: any) => (
                        <TextInput
                          placeholder="Bairro*"
                          style={styles.input}
                          onChangeText={field.onChange}
                          value={field.value}
                        />
                      )}
                      name="address.neighborhood"
                      rules={{ required: true }}
                      defaultValue=""
                    />
                    {errors.address?.neighborhood && (
                      <Text style={styles.errorText}>
                        {errors.address.neighborhood.message}
                      </Text>
                    )}
                    <Controller
                      control={control}
                      render={({ field }: any) => (
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
                      render={({ field }: any) => (
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
                      render={({ field }: any) => (
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
                    <View style={styles.termsAccept}>
                      <Switch
                        value={accepted}
                        onValueChange={setAccepted}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={accepted ? colors.primary : "#f4f3f4"}
                      />
                      <View style={styles.termsAcceptView}>
                        <View style={styles.termsAcceptViewAlt}>
                          <Text style={styles.acceptText}>
                            Eu concordo com os
                          </Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate("Termos")}
                          >
                            <Text style={styles.linkText}>
                              Termos de Uso
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.termsAcceptViewAlt}>
                          <Text style={styles.acceptText}>e as</Text>
                          <TouchableOpacity
                            onPress={() => navigation.navigate("Politicas")}
                          >
                            <Text style={styles.linkText}>
                              Políticas de Privacidade
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSubmit(onSubmit)}
                    >
                      <Text style={styles.buttonText}>Cadastrar-se</Text>
                    </TouchableOpacity>

                    <View style={styles.signInTextContainer}>
                      <Text style={styles.accountText}>
                        Já possui uma conta?
                      </Text>
                      <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                      >
                        <Text style={styles.signInLink}>Login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </ScrollView>
              </>
            )}
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default RegisterScreen;
