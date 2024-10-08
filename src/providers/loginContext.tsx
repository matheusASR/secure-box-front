import React, { createContext, ReactNode, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

interface LoginContextType {
  onSubmit: (formData: any) => void;
  logged: any;
  setLogged: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
}

const LoginContext = createContext<any>({} as LoginContextType);

interface LoginProviderProps {
  children: ReactNode;
}

const LoginProvider: React.FC<LoginProviderProps> = ({ children }) => {
  const [logged, setLogged] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(false)

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

  const onSubmit = async (formData: any) => {
    setLoading(true)
    try {
      formData.email = formData.email.toLowerCase();
      const response = await api.post("/login", formData);
      if (response.status === 200) {
        await AsyncStorage.setItem("@secbox:TOKEN", response.data.token);
        setLogged(true);
        const [message, toastConfig] = generateToastConfig(
          "Login realizado com sucesso!"
        );
        Toast.show(message, toastConfig);
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao fazer login: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    } finally {
      setLoading(false)
    }
  };

  return (
    <LoginContext.Provider value={{ onSubmit, logged, setLogged, loading }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
