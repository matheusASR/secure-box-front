import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";

const DepositModal = ({ isVisible, onClose }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Qual a quantia que deseja depositar?</Text>
         
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
       
        </View>
      </View>
    </Modal>
  );
};

export default DepositModal;