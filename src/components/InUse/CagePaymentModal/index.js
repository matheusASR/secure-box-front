import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const CagePaymentModal = ({
  allocation,
  onClose,
}) => {
  const handlePaymentConfirmed = async () => {
    const formData = {
      paymentStatus: true
    }

    try {
      await api.patch(`/allocations/${allocation.id}/`, formData);
      
    } catch (error) {
      Toast.show(`Erro no pagamento da alocação: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        {allocation.paymentStatus === true ? (
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
            <Text style={styles.modalTitle}>Gaiola {allocation.cageId}</Text>
            <Text style={styles.modalText}>{allocation.price}</Text>
            <Image
              source={require("../../../../assets/QRcode.png")}
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
