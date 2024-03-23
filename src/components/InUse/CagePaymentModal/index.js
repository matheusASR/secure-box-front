import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const CagePaymentModal = ({ allocation, onClose, handlePaymentConfirmed }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <>
          <Text style={styles.modalTitle}>Gaiola {allocation.cageId}</Text>
          <Text style={styles.modalText}>{allocation.price}</Text>
          <Image
            source={require("../../../../assets/QRcode.png")}
            style={styles.qrcode}
          />
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => handlePaymentConfirmed(allocation)}
          >
            <Text style={styles.buttonText}>Copiar código PIX</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </>
      </View>
    </View>
  );
};

export default CagePaymentModal;
