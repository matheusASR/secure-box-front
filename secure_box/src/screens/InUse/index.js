import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";
import ModalPayment from "../../components/Home/CageModal/CagePaymentModal";
import { InUseContext } from "../../providers/inUseContext";
import { colors } from "../../styles";

const InUse = () => {
  const { inUse, formatDateTime, handlePayment } = useContext(InUseContext);
  const [finishContent, setFinishContent] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCage, setSelectedCage] = useState(null);

  const finishAllocation = (cage) => {
    const finalTime = Date.now();
    const timeUsed = Math.floor((finalTime - cage.initialTime) / (1000 * 60));
    const finalTimeFormatted = formatDateTime(finalTime);

    const paymentText = handlePayment(timeUsed);

    setFinishContent((prevFinishContent) => ({
      ...prevFinishContent,
      [cage.number]: {
        finalTimeFormatted,
        timeUsed,
        paymentText,
        pressed: true,
      },
    }));
  };

  const handlePaymentModal = (cageNumber, paymentText) => {
    setSelectedCage(cageNumber);
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedCage(null);
  };

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        {inUse.length === 0 ? (
          <View style={styles.noContent}>
            <Text style={styles.noGaiolasText}>
              Nenhuma gaiola em uso no momento.
            </Text>
          </View>
        ) : (
          <View style={styles.inUseCagesList}>
            {inUse.map((cage) => (
              <View key={cage.number} style={styles.cageContainer}>
                <Text style={styles.cageTitle}>Gaiola {cage.number}</Text>
                {finishContent[cage.number]?.paymentConfirmed === true ? (
                  <TouchableOpacity style={styles.unlockBtn}>
                    <Text style={styles.buttonUnlockText}>Destravar</Text>
                    <Image
                      style={styles.padlock}
                      source={require("../../../assets/OpenedPadlock.png")}
                    />
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text style={styles.cageText}>
                      Horário de início: {formatDateTime(cage.initialTime)}
                    </Text>
                    {!finishContent[cage.number]?.pressed && (
                      <TouchableOpacity
                        style={styles.finishBtn}
                        onPress={() => finishAllocation(cage)}
                      >
                        <Text style={styles.buttonText}>Finalizar</Text>
                      </TouchableOpacity>
                    )}
                    {finishContent[cage.number]?.pressed && (
                      <View style={styles.finishContent}>
                        <Text style={styles.cageText}>
                          Horário final:{" "}
                          {finishContent[cage.number].finalTimeFormatted}
                        </Text>
                        <Text style={styles.cageText}>
                          Tempo usado: {finishContent[cage.number].timeUsed}{" "}
                          minutos
                        </Text>
                        <Text style={styles.cageText}>
                          {finishContent[cage.number].paymentText}
                        </Text>
                        <TouchableOpacity
                          style={styles.paymentBtn}
                          onPress={() =>
                            handlePaymentModal(
                              cage.number,
                              finishContent[cage.number].paymentText
                            )
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
          cageNumber={selectedCage}
          paymentText={finishContent[selectedCage]?.paymentText}
          onClose={handleClosePaymentModal}
          setFinishContent={setFinishContent}
          finishContent={finishContent}
        />
      </Modal>
    </ScreenPatternStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noGaiolasText: {
    fontSize: 17,
    color: "gray",
  },
  cageContainer: {
    width: "100%",
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    height: 300,
    backgroundColor: "#f0f0f0",
    justifyContent: "space-between",
  },
  cageTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cageText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  inUseCagesList: {
    flexDirection: "column",
    gap: 20,
    paddingVertical: 20,
    marginBottom: 30  
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  finishBtn: {
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  paymentBtn: {
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  finishContent: {
    width: "100%",
    alignItems: "center",
  },
  unlockBtn: {
    marginBottom: "20%",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  padlock: {
    width: 30,
    height: 30,
  },
  buttonUnlockText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  noContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default InUse;
