import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native";
import styles from "./styles";

const PaymentMethodModal = ({ isVisible, onClose, addPaymentMethod }: any) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");

  const data = {
    cardNumber: cardNumber,
    cardHolderName: cardHolderName,
    expirationDate: expirationDate,
    cvv: cvv,
    cardType: "Crédito",
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView style={styles.modalView}>
            <View style={styles.inputContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Adicionar Cartão</Text>
                <TouchableOpacity
                  style={styles.closeHeaderBtn}
                  onPress={onClose}
                >
                  <Text style={styles.closeHeaderBtnText}>X</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Número do cartão:</Text>
              <TextInput
                value={cardNumber}
                onChangeText={setCardNumber}
                style={styles.input}
              />

              <Text style={styles.label}>Titular do cartão:</Text>
              <TextInput
                value={cardHolderName}
                onChangeText={setCardHolderName}
                style={styles.input}
              />

              <Text style={styles.label}>Expira em:</Text>
              <TextInput
                value={expirationDate}
                onChangeText={setExpirationDate}
                style={styles.input}
              />

              <Text style={styles.label}>CVV:</Text>
              <TextInput
                value={cvv}
                onChangeText={setCvv}
                style={styles.input}
              />
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={addPaymentMethod(data)}
              >
                <Text style={styles.saveBtnText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PaymentMethodModal;
