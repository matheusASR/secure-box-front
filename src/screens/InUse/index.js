import React, { useContext, useEffect } from "react";
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
import { HomeContext } from "../../providers/homeContext";
import styles from "./styles";

const InUse = () => {
  const {
    getAllocationsNotFinished,
    allocationsNotFinished,
    finishAllocation,
    handlePaymentModal,
    showPaymentModal,
    allocationSelected,
    handleClosePaymentModal,
    unlockCage,
    handlePaymentConfirmed
  } = useContext(InUseContext);
  const { isModalVisible } = useContext(HomeContext);

  useEffect(() => {
    getAllocationsNotFinished();
  }, [
    isModalVisible,
    finishAllocation,
    handlePaymentModal,
    handlePaymentConfirmed,
  ]);

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
                  <>
                    {allocationSelected.unlocked === true ? (
                      <>
                        <Text style={styles.allocationText}>
                          Gaiola destravada com sucesso
                        </Text>
                        <Text style={styles.allocationText}>
                          Você já pode retirar seus pertences!
                        </Text>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.unlockBtn}
                        onPress={() => unlockCage(allocation)}
                      >
                        <Text style={styles.buttonUnlockText}>Destravar</Text>
                        <Image
                          style={styles.padlock}
                          source={require("../../../assets/OpenedPadlock.png")}
                        />
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <>
                    {allocation.pressed ? (
                      <View style={styles.finishContent}>
                        <Text style={styles.allocationText}>
                          Horário de início: {allocation.initialDatetime}
                        </Text>
                        <Text style={styles.allocationText}>
                          Horário final: {allocation.finalDatetime}
                        </Text>
                        <Text style={styles.allocationText}>
                          Preço a pagar: {allocation.price}
                        </Text>
                        <TouchableOpacity
                          style={styles.paymentBtn}
                          onPress={() => handlePaymentModal(allocation)}
                        >
                          <Text style={styles.buttonText}>Pagar</Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <Text style={styles.allocationText}>
                          Horário de início: {allocation.initialDatetime}
                        </Text>
                        <TouchableOpacity
                          style={styles.finishBtn}
                          onPress={() => finishAllocation(allocation)}
                        >
                          <Text style={styles.buttonText}>Finalizar</Text>
                        </TouchableOpacity>
                      </>
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
          handlePaymentConfirmed={handlePaymentConfirmed}
        />
      </Modal>
    </ScreenPatternStack>
  );
};

export default InUse;
