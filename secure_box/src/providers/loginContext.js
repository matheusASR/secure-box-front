import React, { createContext, useState } from "react";
import { api } from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [ logged, setLogged ] = useState(false)

  const onSubmit = async (formData) => {
    // try {
    //   const response = await api.post("/login", formData);
    //   if (response && response.data && response.statusText === "OK") {
    //     // toast
    //     console.log("login sucesso")
    //     await AsyncStorage.setItem("@secbox:TOKEN", response.data.token);
    //     setLogged(true)
    //   }
    // } catch (error) {
    //   // toast
    //   console.log("login erro:", error)
    // }
    setLogged(true)
  };

  return (
    <LoginContext.Provider value={{ onSubmit, logged, setLogged }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
