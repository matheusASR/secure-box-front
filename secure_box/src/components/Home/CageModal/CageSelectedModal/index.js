import React from "react";
import { View, Text, Button, Modal } from "react-native";
import styles from "./styles";

const CageSelectedModal = ({ visible, cage, onClose, onStartStop }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Gaiola {cage.number}</Text>
          <Button
            title="Travar/Iniciar"
            onPress={onStartStop(cage)}
          />
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default CageSelectedModal;
