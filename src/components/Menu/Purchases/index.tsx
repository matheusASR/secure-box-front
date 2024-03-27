import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { api } from "../../../services/api";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../styles";

const Purchases = () => {
  const navigation: any = useNavigation();
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o indicador de loading
  const [allocationsFinished, setAllocationsFinished] = useState([]);

  // useEffect(() => {
  //   const getAllocationsFinished = async () => {
  //     setIsLoading(true); // Ativar o indicador de loading
  //     try {
  //       const token = await AsyncStorage.getItem("@secbox:TOKEN");
  //       const responseProfile = await api.get("/profile", {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (responseProfile.status === 200) {
  //         try {
  //           const responseAllocations = await api.get(
  //             `/allocations/${responseProfile.data.id}/userFinished`
  //           );
  //           if (responseAllocations.status === 200) {
  //             setAllocationsFinished(responseAllocations.data);
  //           }
  //         } catch (error: any) {
  //           Toast.show(`Não foi possível buscar compras do usuário: ${error.response.data.message}`, {
  //             duration: Toast.durations.SHORT,
  //             position: Toast.positions.TOP,
  //             shadow: true,
  //             animation: true,
  //             hideOnPress: true,
  //             delay: 0,
  //           });
  //         }
  //       }
  //     } catch (error: any) {
  //       Toast.show(`Erro ao buscar dados do usuário: ${error.response.data.message}`, {
  //         duration: Toast.durations.SHORT,
  //         position: Toast.positions.TOP,
  //         shadow: true,
  //         animation: true,
  //         hideOnPress: true,
  //         delay: 0,
  //       });
  //     } finally {
  //       setIsLoading(false); // Desativar o indicador de loading após a requisição ser concluída
  //     }
  //   };

  //   getAllocationsFinished();
  // }, []);

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
        <Text style={styles.title}>Minhas Compras</Text>
      </View>
      <ScrollView>
        {isLoading ? ( // Renderizar o indicador de loading se isLoading for verdadeiro
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : allocationsFinished.length === 0 ? (
          <View style={styles.noContent}>
            <Text style={styles.noPurchasesText}>
              Nenhuma compra/alocação realizada até o momento.
            </Text>
          </View>
        ) : (
          <View style={styles.purchasesList}>
            {allocationsFinished.map((allocation: any) => (
              <View key={allocation.id} style={styles.allocationContainer}>
                <Text style={styles.allocationTitle}>
                  Alocação {allocation.id}
                </Text>
                <Text style={styles.allocationData}>
                  Início: {allocation.initialDatetime}
                </Text>
                <Text style={styles.allocationData}>
                  Fim: {allocation.finalDatetime}
                </Text>
                <Text style={styles.allocationData}>
                  Preço: {allocation.price}
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

export default Purchases;

