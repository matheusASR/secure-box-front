import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { updateCageInUse } from "../../CageList/utils";

const CageAllocationModal = ({
  isVisible,
  cage,
  onClose,
  onStartAllocation,
}) => {
  const [allocationStarted, setAllocationStarted] = useState(false);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Gaiola {cage.number}</Text>
          {allocationStarted ? (
            <>
              <View style={styles.allocationStartedView}>
                <Text style={styles.detailsTitle}>Alocação Iniciada!</Text>
                <Text style={styles.detailsTextAlt}>
                  Acompanhe sua alocação na seção "Em uso" no canto inferior
                  direito.
                </Text>
                <TouchableOpacity style={styles.closeBtnAlt} onPress={() => {
                  setAllocationStarted(false)
                  onClose()
                }}>
                  <Text style={styles.closeBtnText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={styles.detailsView}>
                <Text style={styles.detailsTitle}>ATENÇÃO!</Text>
                <Text style={styles.detailsText}>
                  Após apertar o botão Iniciar, a gaiola será destravada e o seu
                  tempo de uso iniciará.
                </Text>
              </View>
              <View style={styles.viewBtns}>
                <TouchableOpacity
                  style={styles.startBtn}
                  onPress={() => {
                    setAllocationStarted(true);
                    onStartAllocation(cage);
                    updateCageInUse(cage.number, true);
                  }}
                >
                  <Text style={styles.startBtnText}>Iniciar</Text>
                  <Image
                    source={require("../../../../../assets/OpenedPadlock.png")}
                    style={styles.openedPadlock}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                  <Text style={styles.closeBtnText}>Fechar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CageAllocationModal;
