import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";

const RemovePaymentMethodModal = ({ isVisible, onClose, removePaymentMethod, paymentMethodId }: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>
            Tem certeza de que deseja remover o método de pagamento?
          </Text>
          <View style={styles.viewBtns}>
            <TouchableOpacity style={styles.yesBtn} onPress={() => removePaymentMethod(paymentMethodId)}>
              <Text style={styles.yesBtnText}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RemovePaymentMethodModal;
