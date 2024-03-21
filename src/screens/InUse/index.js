import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";
import ModalPayment from "../../components/InUse/CagePaymentModal";
import { InUseContext } from "../../providers/inUseContext";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InUse = () => {
  const { formatDateTime, handlePayment } = useContext(InUseContext);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [allocationsNotFinished, setAllocationsNotFinished] = useState([]);
  const [allocationSelected, setAllocationSelected] = useState({});

  useEffect(() => {
    const getAllocationsNotFinished = async () => {
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        const responseProfile = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (responseProfile.status === 200) {
          try {
            const responseAllocations = await api.get(
              `/allocations/${responseProfile.data.id}/userNotFinished`
            );
            if (responseAllocations.status === 200) {
              setAllocationsNotFinished(responseAllocations.data);
            }
          } catch (error) {
            Toast.show(`Erro ao buscar alocações em uso: ${error}`, {
              duration: Toast.durations.SHORT,
              position: Toast.positions.TOP,
              shadow: true,
              animation: true,
              hideOnPress: true,
              delay: 0,
            });
          }
        }
      } catch (error) {
        Toast.show(`Erro ao buscar dados do usuário: ${error}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    };

    getAllocationsNotFinished();
  }, [allocationsNotFinished]);

  const finishAllocation = async (allocationId) => {
    const finalDatetime = Date.now();
    const finalDatetimeFormatted = formatDateTime(finalDatetime);
    const price = handlePayment(timeUsed);
    const formData = {
      finalDatetime: finalDatetimeFormatted,
      price: price,
      pressed: true
    }

    try {
      await api.patch(`/allocations/${allocationId}/`, formData);
      
    } catch (error) {
      Toast.show(`Erro ao finalizar alocação: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const handlePaymentModal = (allocation) => {
    setShowPaymentModal(true);
    setAllocationSelected(allocation)
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        {allocationsNotFinished.length === 0 ? (
          <View style={styles.noContent}>
            <Text style={styles.noGaiolasText}>
              Nenhuma gaiola em uso no momento.
            </Text>
          </View>
        ) : (
          <View style={styles.inUseAllocationsList}>
            {allocationsNotFinished.map((allocation) => (
              <View key={allocation.id} style={styles.allocationContainer}>
                <Text style={styles.allocationTitle}>
                  Gaiola {allocation.cageId}
                </Text>
                {allocation.paymentStatus === true ? (
                  <TouchableOpacity style={styles.unlockBtn}>
                    <Text style={styles.buttonUnlockText}>Destravar</Text>
                    <Image
                      style={styles.padlock}
                      source={require("../../../assets/OpenedPadlock.png")}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text style={styles.allocationText}>
                      Horário de início: {allocation.initialDatetime}
                    </Text>
                    {allocation.pressed && (
                      <TouchableOpacity
                        style={styles.finishBtn}
                        onPress={() => finishAllocation(allocation)}
                      >
                        <Text style={styles.buttonText}>Finalizar</Text>
                      </TouchableOpacity>
                    )}
                    {allocation.pressed && (
                      <View style={styles.finishContent}>
                        <Text style={styles.allocationText}>
                          Horário final: {allocation.finalDatetime}
                        </Text>
                        <Text style={styles.allocationText}>
                          {allocation.price}
                        </Text>
                        <TouchableOpacity
                          style={styles.paymentBtn}
                          onPress={() =>
                            handlePaymentModal(allocation)
                          }
                        >
                          <Text style={styles.buttonText}>Pagar</Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </>
                )}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
      <Modal
        visible={showPaymentModal}
        animationType="slide"
        transparent={true}
      >
        <ModalPayment
          allocation={allocationSelected}
          onClose={handleClosePaymentModal}
        />
      </Modal>
    </ScreenPatternStack>
  );
};

export default InUse;
