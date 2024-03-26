import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodModal from "./PaymentMethodModal";
import styles from "./styles";

const PaymentMethod = () => {
  const navigation: any = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState<any>({
    cardType: "CRÉDITO",
    cardNumber: "3453 3738 9383 3888",
    cardHolderName: "MATHEUS A S REGO",
    expirationDate: "09/28",
    cvv: "434",
  });
  const [paymentMethodModalVisible, setPaymentMethodModalVisible] =
    useState(false);

  const togglePaymentMethodModal = () => {
    setPaymentMethodModalVisible(!paymentMethodModalVisible);
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("MainMenu")}
        >
          <Image
            style={styles.backBtnImage}
            source={require("../../../../assets/BackBtn.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Forma de Pagamento</Text>
      </View>
      <View style={styles.paymentMethodContainer}>
        {paymentMethod ? (
          <>
            <View style={styles.paymentMethodCard}>
              <Text style={styles.cardType}>
                {paymentMethod.cardType}
              </Text>
              <Text style={styles.cardNumber}>
                {paymentMethod.cardNumber}
              </Text>
              <Text style={styles.expirationDate}>
                {paymentMethod.expirationDate}
              </Text>
              <Text style={styles.cardHolderName}>
                {paymentMethod.cardHolderName}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addPaymentBtn}
              onPress={() => setPaymentMethod(null)}
            >
              <Text style={styles.addPaymentBtnText}>
                Remover Cartão de Crédito/Débito
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.addPaymentBtn}
            onPress={togglePaymentMethodModal}
          >
            <Text style={styles.addPaymentBtnText}>
              Adicionar Cartão de Crédito/Débito
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <PaymentMethodModal
        isVisible={paymentMethodModalVisible}
        onClose={togglePaymentMethodModal}
      />
    </>
  );
};

export default PaymentMethod;
