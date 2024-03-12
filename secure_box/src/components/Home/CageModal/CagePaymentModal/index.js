import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const CagePaymentModal = ({ cageNumber, paymentText, onClose }) => {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {/* <View style={styles.paymentConfirmedView}>
          <Text style={styles.modalText}>Pagamento concluído!</Text>
          <Text style={styles.modalText}>Você já pode destravar a gaiola.</Text>
        </View>
        <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity> */}

        {/* -------------------------------------- */}

        <Text style={styles.modalTitle}>Gaiola {cageNumber}</Text>
        <Text style={styles.modalText}>{paymentText}</Text>
        <Image
          source={require("../../../../../assets/QRcode.png")}
          style={styles.qrcode}
        />
        <TouchableOpacity style={styles.modalCloseBtn}>
          <Text style={styles.buttonText}>Copiar código PIX</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    height: 400,
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalCloseBtn: {
    backgroundColor: "blue",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrcode: {
    width: "100%",
    height: "45%",
  },
  paymentConfirmedView: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "50%",
  },
});

export default CagePaymentModal;
