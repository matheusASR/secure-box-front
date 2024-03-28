import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../styles";

const Deposits = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false); 
  const [userPayments, setUserPayments] = useState([]);

  useEffect(() => {
    const getUserPayments = async () => {
      setIsLoading(true); 
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        const responseProfile = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseProfile.status === 200) {
          try {
            const responseUserPayments = await api.get(
              `/payments/${responseProfile.data.id}/`
            );
            if (responseUserPayments.status === 200) {
              setUserPayments(responseUserPayments.data);
            }
          } catch (error: any) {
            Toast.show(`Não foi possível buscar depósitos do usuário: ${error.response.data.message}`, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          }
        }
      } catch (error: any) {
        Toast.show(`Erro ao buscar dados do usuário: ${error.response.data.message}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      } finally {
        setIsLoading(false); // Desativar o indicador de loading após a requisição ser concluída
      }
    };

    getUserPayments();
  }, []);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("MainMenu")}
        >
          <Image
            style={styles.backBtnImage}
            source={require("../../../../assets/BackBtn.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Minhas Alocações</Text>
      </View>
      <ScrollView>
        {isLoading ? ( // Renderizar o indicador de loading se isLoading for verdadeiro
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : userPayments.length === 0 ? (
          <View style={styles.noContent}>
            <Text style={styles.noDepositsText}>
              Nenhum depósito realizado até o momento.
            </Text>
          </View>
        ) : (
          <View style={styles.depositsList}>
            {userPayments.map((userPayment: any) => (
              <View key={userPayment.id} style={styles.userPaymentContainer}>
                <Text style={styles.userPaymentTitle}>
                  Pagamento ID: {userPayment.id}
                </Text>
                <Text style={styles.userPaymentData}>
                  Valor: {userPayment.price}
                </Text>
                <Text style={styles.userPaymentData}>
                  Data: {userPayment.paymentDate}
                </Text>
                <Text style={styles.userPaymentData}>
                  Tipo de pagamento: {userPayment.type}
                </Text>
                {/* <TouchableOpacity style={styles.receiptBtn}>
                  <Text style={styles.receiptText}>Comprovante</Text>
                </TouchableOpacity> */}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Deposits;