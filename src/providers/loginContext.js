import React, { createContext, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

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

  const onSubmit = async (formData) => {
    try {
      formData.email = formData.email.toLowerCase();
      const response = await api.post("/login", formData);
      if (response.status === 200) {
        await AsyncStorage.setItem("@secbox:TOKEN", response.data.token);
        setLogged(true);
        const toastConfig = generateToastConfig(
          "Login realizado com sucesso! Você será redirecionado."
        );
        Toast.show(toastConfig);
      }
    } catch (error) {
      const toastConfig = generateToastConfig(`Erro ao fazer login: ${error}`);
      Toast.show(toastConfig);
    }
  };

  return (
    <LoginContext.Provider value={{ onSubmit, logged, setLogged }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
