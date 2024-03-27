import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const finishAllocationModal = ({
  allocation,
  onClose,
  finishPayAllocation,
  price,
  finalDatetime
}: any) => {

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <>
          <Text style={styles.modalTitle}>Gaiola {allocation.cageId}</Text>

          <Text style={styles.modalText}>
            Início: {allocation.initialDatetime}
          </Text>
          <Text style={styles.modalText}>Horário atual: {finalDatetime}</Text>
          <Text style={styles.modalText}>Valor a pagar: {price}</Text>

          <Text style={styles.modalText}>
            Tem certeza de que deseja finalizar a alocação?
          </Text>
          <Text style={styles.modalText}>
            Certifique-se de que possui saldo em sua conta para pagar!
          </Text>
          <View style={styles.viewBttns}>
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() =>
                finishPayAllocation(allocation, finalDatetime, price)
              }
            >
              <Text style={styles.buttonText}>Finalizar/Pagar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </>
      </View>
    </View>
  );
};

export default finishAllocationModal;
