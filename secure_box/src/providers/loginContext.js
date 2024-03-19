import React, { createContext, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const response = await api.post("/login", formData);
      if (response.status === 200) {
        await AsyncStorage.setItem("@secbox:TOKEN", response.data.token);
        setLogged(true);
        Toast.show("Login realizado com sucesso! Você será redirecionado.", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    } catch (error) {
      Toast.show(`Erro ao fazer login: ${error}`, {
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
    <LoginContext.Provider value={{ onSubmit, logged, setLogged }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
