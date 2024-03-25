import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { HomeContext } from "../../providers/homeContext";
import CageList from "../../components/Home/CageList";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../../providers/loginContext";
import { RNCamera } from "react-native-camera";

const HomeScreen = ({ navigation }) => {
  const { isCameraOpen, setIsCameraOpen, requestStatus, handleBarCodeRead } =
    useContext(HomeContext);
  const { setLogged } = useContext(LoginContext);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        if (!token) {
          setLogged(false);
        }
      } catch (error) {
        Toast.show(
          `Erro ao verificar token do usuário: ${error.response.data.message}`,
          {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          }
        );
        setLogged(false);
      }
    };

    checkToken();
  }, []);

  return (
    <>
      {isCameraOpen ? (
        <RNCamera
          style={{ flex: 1 }}
          type={RNCamera.Constants.Type.back}
          onBarCodeRead={handleBarCodeRead}
          captureAudio={false}
        />
      ) : (
        <>
          {requestStatus === 200 ? (
            <>
              <View style={styles.header}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate("Home")}>
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
            <View>
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
                  <Text style={styles.buttonText}>
                    Acessar gaiola pelo QR code
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
