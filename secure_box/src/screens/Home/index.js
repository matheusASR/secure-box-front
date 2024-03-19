import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { HomeContext } from "../../providers/homeContext";
import CageList from "../../components/Home/CageList";
import styles from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginContext } from "../../providers/loginContext";

const HomeScreen = ({ navigation }) => {
  const { qrcode, setQrcode } = useContext(HomeContext);
  const { setLogged } = useContext(LoginContext)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('@secbox:TOKEN');
        if (!token) {
          setLogged(false)
        }
      } catch (error) {
        Toast.show(`Erro ao verificar token do usuário: ${error}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        setLogged(false)
      }
    };

    checkToken();
  }, []);

  const handleQrcode = () => {
    setQrcode(true);
  };

  const backHome = () => {
    setQrcode(false);
  };

  return (
    <>
      {qrcode ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={backHome}>
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
            <TouchableOpacity style={styles.button} onPress={handleQrcode}>
              <Text style={styles.buttonText}>Acessar gaiola pelo QRcode</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.cageListRegistered}>
            <Text style={styles.otherAccessText}>- - - - - Ou - - - - -</Text>
            <Text style={styles.accessText}>
              Acessar local já cadastrado:
            </Text>
            <ScrollView style={styles.cageListScroll}>
              <TouchableOpacity style={styles.cageListCard} onPress={handleQrcode}>
                <Image
                  style={styles.cageCardImage}
                  source={require("../../../assets/ShoppingCentro.jpg")}
                />
                <View style={styles.textCardView}>
                  <Text style={styles.titleCageCard}>Shopping Centro</Text>
                  <Text>
                    Rua Rubião Júnior, 84 Centro - São José dos Campos - SP
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;

