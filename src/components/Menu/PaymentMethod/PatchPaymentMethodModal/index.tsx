import React from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import styles from "./styles";

const PatchPaymentMethodModal = ({ isVisible, onClose, onConfirm }: any) => {
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
            Tem certeza de que deseja definir este método de pagamento como
            padrão?
          </Text>
          <View style={styles.viewBtns}>
            <TouchableOpacity style={styles.yesBtn} onPress={onConfirm}>
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

export default PatchPaymentMethodModal;
