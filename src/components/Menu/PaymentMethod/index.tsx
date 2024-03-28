import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodModal from "./PaymentMethodModal";
import styles from "./styles";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";

const PaymentMethod = () => {
  const navigation: any = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [userId, setUserId] = useState("");

  const getUserPaymentMethods = async () => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const responseProfile = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseProfile.status === 200) {
        setUserId(responseProfile.data.id);
        setPaymentMethods(responseProfile.data.paymentMethods);
      }
    } catch (error: any) {
      Toast.show(
        `Erro ao buscar dados do usuário: ${error.response.data.message}`,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
    } 
  };

  useEffect(() => {
    getUserPaymentMethods();
  }, []);

  const [paymentMethodModalVisible, setPaymentMethodModalVisible] =
    useState(false);

  const togglePaymentMethodModal = () => {
    setPaymentMethodModalVisible(!paymentMethodModalVisible);
  };

  const addPaymentMethod = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.post(`/paymentMethods/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      });
      if (response.status === 201) {
        Toast.show("Método de pagamento adicionado com sucesso!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        getUserPaymentMethods();
        togglePaymentMethodModal()
      }
    } catch (error: any) {
      Toast.show(
        `Erro ao criar método de pagamento: ${error.response.data.message}`,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
    }
  };

  const removePaymentMethod = async (id: any) => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.post(`/paymentMethods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.status === 204) {
        Toast.show("Método de pagamento excluído com sucesso!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        getUserPaymentMethods();
      }
    } catch (error: any) {
      Toast.show(
        `Erro ao deletar método de pagamento: ${error.response.data.message}`,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
    } 
  };

  const patternPaymentMethod = async (id: any) => {
    const payload = {
      isDefault: true
    }
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.post(`/paymentMethods/${id}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        payload
      });
      if (response.status === 204) {
        Toast.show("Método de pagamento definido como padrão!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        getUserPaymentMethods();
      }
    } catch (error: any) {
      Toast.show(
        `Erro ao definir método de pagamento como padrão: ${error.response.data.message}`,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
    } 
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
            {paymentMethods.map((paymentMethod: any, index: any) => (
              <View key={index} style={styles.paymentMethodCard}>
                <TouchableOpacity
                  style={styles.removeCardBttn}
                  onPress={removePaymentMethod(paymentMethod.id)}
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
                    <TouchableOpacity onPress={patternPaymentMethod(paymentMethod.id)}>
                      <Text style={styles.cardDefault}>
                        Definir como padrão
                      </Text>
                    </TouchableOpacity>
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
        addPaymentMethod={addPaymentMethod}
      />
    </>
  );
};

export default PaymentMethod;
