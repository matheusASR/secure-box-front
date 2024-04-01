import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  ActivityIndicator,
} from "react-native";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";
import FinishAllocationModal from "../../components/InUse/FinishAllocationModal";
import { InUseContext } from "../../providers/inUseContext";
import styles from "./styles";
import { colors } from "../../styles";
import { HomeContext } from "../../providers/homeContext";

const InUse = () => {
  const [loading, setLoading] = useState(false);
  const {
    getAllocationsNotFinished,
    allocationsNotFinished,
    handleFinishModal,
    handleCloseFinishModal,
    showFinishModal,
    allocationSelected,
    unlockCage,
    finishPayAllocation,
    price,
    formatDateTime,
    handlePayment,
    setPrice,
    finalDatetime,
    setFinalDatetime,
    user,
  } = useContext(InUseContext);
  const { handleStartAllocation } = useContext(HomeContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getAllocationsNotFinished();
      setLoading(false);
    };

    fetchData();
  }, [handleStartAllocation]);

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.loadingView}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            {allocationsNotFinished.length === 0 ? (
              <View style={styles.noContent}>
                <Text style={styles.noGaiolasText}>
                  Nenhuma gaiola em uso no momento.
                </Text>
              </View>
            ) : (
              <View style={styles.inUseAllocationsList}>
                {allocationsNotFinished.map((allocation: any) => (
                  <View key={allocation.id} style={styles.allocationContainer}>
                    <Text style={styles.allocationTitle}>
                      Gaiola {allocation.cageId}
                    </Text>
                    {allocation.paymentStatus === true ? (
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
                    ) : (
                      <>
                        <Text style={styles.allocationText}>
                          Horário de início: {allocation.initialDatetime}
                        </Text>
                        <TouchableOpacity
                          style={styles.finishBtn}
                          onPress={() => {
                            setFinalDatetime(formatDateTime(Date.now()));
                            setPrice(
                              handlePayment(
                                formatDateTime(Date.now()),
                                allocation.initialDatetime
                              )
                            );
                            handleFinishModal(allocation);
                          }}
                        >
                          <Text style={styles.buttonText}>Finalizar/Pagar</Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <Modal visible={showFinishModal} animationType="slide" transparent={true}>
        <FinishAllocationModal
          allocation={allocationSelected}
          onClose={handleCloseFinishModal}
          finishPayAllocation={finishPayAllocation}
          price={price}
          finalDatetime={finalDatetime}
          user={user}
        />
      </Modal>
    </ScreenPatternStack>
  );
};

export default InUse;
