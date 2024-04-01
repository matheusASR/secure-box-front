import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const FinishAllocationModal = ({
  allocation,
  onClose,
  finishPayAllocation,
  price,
  finalDatetime,
  user,
}: any) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ID Alocação: {allocation.id}</Text>
            <TouchableOpacity style={styles.closeHeaderBtn} onPress={onClose}>
              <Text style={styles.closeHeaderBtnText}>X</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalText}>
            Início: {allocation.initialDatetime}
          </Text>
          <Text style={styles.modalText}>Horário atual: {finalDatetime}</Text>
          <Text style={styles.modalText}>Valor a pagar: {price}</Text>

          <Text style={styles.attentionTitle}>ATENÇÃO!</Text>
          <Text style={styles.modalText}>
            Tem certeza de que deseja finalizar a alocação?
          </Text>
          <Text style={styles.modalText}>
            Certifique-se de que possui saldo em sua conta para pagar!
          </Text>
          <Text style={styles.modalText}>Seu saldo: {user.wallet.balance}</Text>

          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() =>
              finishPayAllocation(allocation, finalDatetime, price)
            }
          >
            <Text style={styles.buttonText}>Finalizar/Pagar</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

export default FinishAllocationModal;
