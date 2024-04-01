import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { api } from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DepositModal = ({ isVisible, onClose, user, navigation }: any) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [depositValue, setDepositValue] = useState<any>();
  const [defineValue, setDefineValue] = useState(false);
  let defaultPaymentMethod: any = null;

  if (user.paymentMethods.length > 0) {
    defaultPaymentMethod = user.paymentMethods.find(
      (method: any) => method.isDefault === true
    );
  }

  const generateToastConfig = (message: any) => {
    return [
      message,
      {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      },
    ];
  };

  const handlePaymentMethodSelect = (method: any) => {
    setSelectedPaymentMethod(method);
  };

  const handleNext = () => {
    setDefineValue(true);
  };

  function formatDateTime(timestamp: any) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  const deposit = async () => {
    if (depositValue < 5) {
      const [message, toastConfig] = generateToastConfig(
        "O valor mínimo de depósito é 5.00!"
      );
      Toast.show(message, toastConfig);
    } else {
      const payload = {
        price: Number(depositValue),
        paymentDate: formatDateTime(Date.now()),
        type: selectedPaymentMethod,
      };
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        await api.post(`/payments/${user.id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const [message, toastConfig] = generateToastConfig(
          "Depósito realizado com sucesso!"
        );
        Toast.show(message, toastConfig);
        onClose();
      } catch (error: any) {
        const [message, toastConfig] = generateToastConfig(
          `Ocorreu um erro ao realizar depósito: ${error.response.data.message}`
        );
        Toast.show(message, toastConfig);
      }
    }
  };

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
          <View style={styles.modalView}>
            {defineValue ? (
              <>
                <Text style={styles.title}>Defina o valor do depósito:</Text>
                <Text>Depósito mínimo: 5.00</Text>
                <TextInput
                  placeholder="Valor*"
                  style={styles.input}
                  value={depositValue}
                  onChangeText={setDepositValue}
                  keyboardType="numeric"
                />
                <View style={styles.viewBtns}>
                  <TouchableOpacity style={styles.nextBtn} onPress={deposit}>
                    <Text style={styles.nextBtnText}>Depositar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setDefineValue(false)}
                  >
                    <Text style={styles.closeBtnText}>Voltar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>
                  Selecione o método de pagamento:
                </Text>
                <View style={styles.viewOptions}>
                  <TouchableOpacity
                    style={[
                      styles.optionBtn,
                      selectedPaymentMethod === "PIX" &&
                        styles.selectedOptionBtn,
                    ]}
                    onPress={() => handlePaymentMethodSelect("PIX")}
                  >
                    <Image
                      style={styles.optionBtnImage}
                      source={require("../../../../../assets/PIX.png")}
                    />
                    <Text style={styles.optionBtnText}>PIX</Text>
                  </TouchableOpacity>
                  {defaultPaymentMethod ? (
                    <TouchableOpacity
                      style={[
                        styles.optionBtn,
                        selectedPaymentMethod === "PADRÃO" &&
                          styles.selectedOptionBtn,
                      ]}
                      onPress={() => handlePaymentMethodSelect("PADRÃO")}
                    >
                      <Image
                        style={styles.optionBtnImage}
                        source={require("../../../../../assets/PaymentMethods.png")}
                      />
                      <Text style={styles.optionBtnText}>PADRÃO</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.addPaymentMethodBtn}
                      onPress={() => {
                        onClose();
                        navigation.navigate("PaymentMethods");
                      }}
                    >
                      <Text style={styles.addPaymentMethodBtnText}>
                        Adicionar forma de pagamento
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.viewBtns}>
                  <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={handleNext}
                    disabled={!selectedPaymentMethod}
                  >
                    <Text style={styles.nextBtnText}>Próximo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                    <Text style={styles.closeBtnText}>Fechar</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DepositModal;
