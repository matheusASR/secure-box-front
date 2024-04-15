import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PaymentMethodModal from "./PaymentMethodModal";
import styles from "./styles";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../services/api";
import RemovePaymentMethodModal from "./RemovePaymentMethodModal";
import PatchPaymentMethodModal from "./PatchPaymentMethodModal";

const PaymentMethod = () => {
  const navigation: any = useNavigation();
  // const [isLoading, setIsLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [paymentMethodModalVisible, setPaymentMethodModalVisible] =
    useState(false);
  const [removePMModalVisible, setRemovePMModalVisible] =
    useState<boolean>(false);
  const [patchPMModalVisible, setPatchPMModalVisible] =
    useState<boolean>(false);
  const [userId, setUserId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");

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

  const togglePaymentMethodModal = () => {
    setPaymentMethodModalVisible(!paymentMethodModalVisible);
  };

  const toggleRemovePaymentMethodModal = (PMID: any) => {
    setRemovePMModalVisible(!removePMModalVisible);
    setPaymentMethodId(PMID)
  };

  const togglePatchPaymentMethodModal = (PMID: any) => {
    setPatchPMModalVisible(!patchPMModalVisible);
    setPaymentMethodId(PMID)
  };

  const addPaymentMethod = async (data: any) => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.post(`/paymentMethods/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        togglePaymentMethodModal();
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
      const response = await api.delete(`/paymentMethods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
        setRemovePMModalVisible(false)
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
      setRemovePMModalVisible(false)
    }
  };

  const patternPaymentMethod = async (id: any) => {
    const payload = {
      isDefault: true,
    };
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const response = await api.patch(
        `/paymentMethods/${id}/`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Toast.show("Método de pagamento definido como padrão!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        getUserPaymentMethods();
        setPatchPMModalVisible(false)
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
      setPatchPMModalVisible(false)
    }
  };

  const formatCardNumber = (cardNumber: any) => {
    if (typeof cardNumber !== "string") {
      return "";
    }
    cardNumber = cardNumber.replace(/\s/g, "");
    const formattedCardNumber = cardNumber.replace(/(.{4})/g, "$1 ");

    return formattedCardNumber;
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
        <Text style={styles.title}>Formas de Pagamento</Text>
      </View>
      <View style={styles.paymentMethodContainer}>
        {paymentMethods.length > 0 ? (
          <>
            {paymentMethods.map((paymentMethod: any, index: any) => (
              <View key={index} style={styles.paymentMethodCard}>
                <TouchableOpacity
                  style={styles.removeCardBttn}
                  onPress={() => toggleRemovePaymentMethodModal(paymentMethod.id)}
                >
                  <Text style={styles.removeCardBttnText}>Remover cartão</Text>
                </TouchableOpacity>
                <Text style={styles.cardType}>{paymentMethod.cardType}</Text>
                <Text style={styles.cardNumber}>
                  {formatCardNumber(paymentMethod.cardNumber)}
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
                    <TouchableOpacity
                      style={styles.cardDefineDefaultBttn}
                      onPress={() => togglePatchPaymentMethodModal(paymentMethod.id)}
                    >
                      <Text style={styles.cardDefineDefaultText}>
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
      <RemovePaymentMethodModal
        isVisible={removePMModalVisible}
        onClose={toggleRemovePaymentMethodModal}
        removePaymentMethod={removePaymentMethod}
        paymentMethodId={paymentMethodId}
      />
      <PatchPaymentMethodModal
        isVisible={patchPMModalVisible}
        onClose={togglePatchPaymentMethodModal}
        patternPaymentMethod={patternPaymentMethod}
        paymentMethodId={paymentMethodId}
      />
    </>
  );
};

export default PaymentMethod;
