import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

const CageAllocationModal = ({
  isVisible,
  cage,
  onClose,
  onStartAllocation,
}: any) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Gaiola {cage.id}</Text>
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
                onStartAllocation(cage.id);
              }}
            >
              <Text style={styles.startBtnText}>Iniciar</Text>
              <Image
                source={require("../../../../assets/OpenedPadlock.png")}
                style={styles.openedPadlock}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={styles.closeBtnText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CageAllocationModal;
