import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { HomeContext } from "../../providers/homeContext";
import CageList from "../../components/Home/CageList";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../providers/loginContext";
import Toast from "react-native-root-toast";

const HomeScreen = ({ navigation }: any) => {
  const { isCameraOpen, setIsCameraOpen, requestStatus, handleBarCodeRead } =
    useContext<any>(HomeContext);
  const { setLogged } = useContext(LoginContext);

  // useEffect(() => {
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("@secbox:TOKEN");
  //       if (!token) {
  //         setLogged(false);
  //       }
  //     } catch (error: any) {
  //       Toast.show(
  //         `Erro ao verificar token do usuário: ${error.response.data.message}`,
  //         {
  //           duration: Toast.durations.SHORT,
  //           position: Toast.positions.TOP,
  //           shadow: true,
  //           animation: true,
  //           hideOnPress: true,
  //           delay: 0,
  //         }
  //       );
  //       setLogged(false);
  //     }
  //   };

  //   checkToken();
  // }, []);

  return (
    <>
      {isCameraOpen ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setIsCameraOpen(false)}
            >
              <Image
                style={styles.backBtnImage}
                source={require("../../../assets/BackBtn.png")}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Selecione a gaiola:</Text>
          </View>
          <CageList />
        </>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Home</Text>
          </View>
          <View style={styles.container}>
            <Image
              source={require("../../../assets/QRcode.png")}
              style={styles.buttonImage}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setIsCameraOpen(true)}
            >
              <Text style={styles.buttonText}>Acessar gaiola pelo QR code</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
};

export default HomeScreen;
