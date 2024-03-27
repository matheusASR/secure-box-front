import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodModal from "./PaymentMethodModal";
import styles from "./styles";

const PaymentMethod = () => {
  const navigation: any = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([
    {
      cardType: "CRÉDITO",
      cardNumber: "3453 3738 9383 3888",
      cardHolderName: "MATHEUS A S REGO",
      expirationDate: "09/28",
      cvv: "434",
      isDefault: true,
    },
    {
      cardType: "CRÉDITO",
      cardNumber: "3453 3738 9383 3888",
      cardHolderName: "MATHEUS A S REGO",
      expirationDate: "09/28",
      cvv: "434",
      isDefault: false,
    },
  ]);
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
        {paymentMethods.length > 0 ? (
          <>
            {paymentMethods.map((paymentMethod, index) => (
              <View key={index} style={styles.paymentMethodCard}>
                <TouchableOpacity
                  style={styles.removeCardBttn}
                  // onPress={togglePaymentMethodModal}
                >
                  <Text style={styles.removeCardBttnText}>Remover cartão</Text>
                </TouchableOpacity>
                <Text style={styles.cardType}>{paymentMethod.cardType}</Text>
                <Text style={styles.cardNumber}>
                  {paymentMethod.cardNumber}
                </Text>
                <Text style={styles.expirationDate}>
                  {paymentMethod.expirationDate}
                </Text>
                <Text style={styles.cardHolderName}>
                  {paymentMethod.cardHolderName}
                </Text>
                {paymentMethod.isDefault === true ? (
                  <>
                    <Text style={styles.cardDefault}>Padrão</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.cardDefault}>Definir como padrão</Text>                  
                  </>
                )}
              </View>
            ))}
            {paymentMethods.length < 2 && (
              <TouchableOpacity
                style={styles.addPaymentBtn}
                onPress={togglePaymentMethodModal}
              >
                <Text style={styles.addPaymentBtnText}>
                  Adicionar Cartão de Crédito/Débito
                </Text>
              </TouchableOpacity>
            )}
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
