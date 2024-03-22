import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { MenuContext } from "../../../providers/menuContext";

const Purchases = () => {
  const navigation = useNavigation();
  const { getAllocationsFinished, allocationsFinished } = useContext(MenuContext)

  useEffect(() => {
    getAllocationsFinished();
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
        <Text style={styles.title}>Minhas Compras</Text>
      </View>
      <ScrollView>
        {allocationsFinished.length === 0 ? (
          <View style={styles.noContent}>
            <Text style={styles.noPurchasesText}>
              Nenhuma compra/alocação realizada até o momento. 
            </Text>
          </View>
        ) : (
          <View style={styles.purchasesList}>
            {allocationsFinished.map((allocation) => (
              <View key={allocation.id} style={styles.allocationContainer}>
                <Text style={styles.allocationTitle}>Alocação {allocation.id}</Text>
                <Text style={styles.allocationData}>Início: {allocation.initialDatetime}</Text>
                <Text style={styles.allocationData}>Fim: {allocation.finalDatetime}</Text>
                <Text style={styles.allocationData}>Preço: {allocation.price}</Text>
                <TouchableOpacity style={styles.receiptBtn}>
                  <Text style={styles.receiptText}>Comprovante</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default Purchases;
