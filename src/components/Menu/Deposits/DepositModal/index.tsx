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
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import { api } from "../../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import { colors } from "../../../../styles";

const DepositModal = ({ isVisible, onClose, user, navigation }: any) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [depositValue, setDepositValue] = useState<any>();
  const [qrCodePix, setQrCodePix] = useState<any>(false);
  const [pixCode, setPixCode] = useState("");
  const [defineValue, setDefineValue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const replaceCommaWithDot = (value: any) => {
    if (typeof value === "string") {
      return value.replace(",", ".");
    }
    return value;
  };

  const deposit = async () => {
    const price = replaceCommaWithDot(depositValue);
    if (price < 5) {
      const [message, toastConfig] = generateToastConfig(
        "O valor mínimo de depósito é 5.00!"
      );
      Toast.show(message, toastConfig);
    }

    if (selectedPaymentMethod === "PIX") {
      const value = Number(price);
      generatePixCode();
      setQrCodePix(true);
    } else {
      const payload = {
        price: Number(price),
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

  const generatePixCode = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const responsePix = await api.post(`/generatepix/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responsePix.status === 201) {
        setPixCode(responsePix.data.qrcode);
      }
    } catch (error: any) {
      const [message, toastConfig] = generateToastConfig(
        `Ocorreu um erro ao gerar cobrança pix: ${error.response.data.message}`
      );
      Toast.show(message, toastConfig);
    } finally {
      setIsLoading(false);
    }
  };

  const depositPix = async () => {
    const price = replaceCommaWithDot(depositValue);

    const payload = {
      price: Number(price),
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
  };

  const copyTextToClipboard = () => {};

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
            {qrCodePix ? (
              <>
                <View style={styles.qrCodePixView}>
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>Código PIX:</Text>
                    <TouchableOpacity
                      style={styles.closeHeaderBtn}
                      onPress={onClose}
                    >
                      <Text style={styles.closeHeaderBtnText}>X</Text>
                    </TouchableOpacity>
                  </View>
                  {isLoading && (
                    <>
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator
                          size="large"
                          color={colors.primary}
                        />
                      </View>
                    </>
                  )}
                  {pixCode && (
                    <>
                      <QRCode value={pixCode} size={200} />
                      <Text style={styles.qrCodeText}>{pixCode}</Text>
                    </>
                  )}
                  <TouchableOpacity
                    style={styles.copyCodeBtn}
                    onPress={copyTextToClipboard}
                  >
                    <Text style={styles.copyCodeBtnText}>
                      Copiar código PIX
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.alreadyPaidBtn}
                    onPress={depositPix}
                  >
                    <Text style={styles.alreadyPaidBtnText}>Já paguei!</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                {defineValue ? (
                  <>
                    <View style={styles.header}>
                      <Text style={styles.headerTitle}>
                        Defina o valor do depósito:
                      </Text>
                      <TouchableOpacity
                        style={styles.closeHeaderBtn}
                        onPress={onClose}
                      >
                        <Text style={styles.closeHeaderBtnText}>X</Text>
                      </TouchableOpacity>
                    </View>
                    <Text>Depósito mínimo: 5.00</Text>
                    <TextInput
                      placeholder="Valor*"
                      style={styles.input}
                      value={depositValue}
                      onChangeText={setDepositValue}
                      keyboardType="numeric"
                    />
                    <View style={styles.viewBtns}>
                      <TouchableOpacity
                        style={styles.nextBtn}
                        onPress={deposit}
                      >
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
                    <View style={styles.header}>
                      <Text style={styles.headerTitle}>
                        Selecione o método de pagamento:
                      </Text>
                      <TouchableOpacity
                        style={styles.closeHeaderBtn}
                        onPress={onClose}
                      >
                        <Text style={styles.closeHeaderBtnText}>X</Text>
                      </TouchableOpacity>
                    </View>
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
                      <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={onClose}
                      >
                        <Text style={styles.closeBtnText}>Fechar</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default DepositModal;
