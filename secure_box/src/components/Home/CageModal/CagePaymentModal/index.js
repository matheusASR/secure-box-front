import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const CagePaymentModal = ({
  cageNumber,
  paymentText,
  onClose,
  setFinishContent,
  finishContent,
}) => {
  const handlePaymentConfirmed = () => {
    setFinishContent((prevFinishContent) => ({
      ...prevFinishContent,
      [cageNumber]: {
        ...prevFinishContent[cageNumber],
        paymentConfirmed: true,
      },
    }));
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {finishContent[cageNumber]?.paymentConfirmed === true ? (
          <>
            <View style={styles.paymentConfirmedView}>
              <Text style={styles.modalText}>Pagamento concluído!</Text>
              <Text style={styles.modalText}>
                Você já pode destravar a gaiola.
              </Text>
            </View>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.modalTitle}>Gaiola {cageNumber}</Text>
            <Text style={styles.modalText}>{paymentText}</Text>
            <Image
              source={require("../../../../../assets/QRcode.png")}
              style={styles.qrcode}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={handlePaymentConfirmed}
            >
              <Text style={styles.buttonText}>Copiar código PIX</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalCloseBtn} onPress={onClose}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default CagePaymentModal;
