import React, { createContext } from "react";
import { api } from "../services/api";
import Toast from "react-native-root-toast";

const RegisterContext = createContext();

const RegisterProvider = ({ children }) => {
  const generateToastConfig = (message) => {
    return {
      message: message,
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    };
  };

  const onSubmit = async (data) => {
    data.email = data.email.toLowerCase();
    delete data.confirmPassword;

    try {
      const response = await api.post("/users", data);
      if (response.status === 201) {
        const toastConfig = generateToastConfig(
          "Cadastro realizado com sucesso! Você será redirecionado."
        );
        Toast.show(toastConfig);

        // setTimeout(() => {
        //   navigation.navigate("Login");
        // }, 2000);
      } else {
        const toastConfig = generateToastConfig(
          "Erro ao cadastrar usuário. Verifique os dados e tente novamente."
        );
        Toast.show(toastConfig);
      }
    } catch (error) {
      const toastConfig = generateToastConfig(
        `Ocorreu um erro ao cadastrar o usuário: ${error}`
      );
      Toast.show(toastConfig);
    }
  };

  return (
    <RegisterContext.Provider value={{ onSubmit }}>
      {children}
    </RegisterContext.Provider>
  );
};

export { RegisterProvider, RegisterContext };
