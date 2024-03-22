import React, { useContext } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  TextInput,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import styles from "./styles";
import { MenuContext } from "../../../../providers/menuContext";

const EditProfileModal = ({ isVisible, onClose }) => {
  const {
    handleEditProfile,
    setBirthdate,
    setCel,
    setName,
    setEmail,
    name,
    cel,
    birthdate,
    email,
  } = useContext(MenuContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <View style={styles.modalView}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />

              <Text style={styles.label}>Email:</Text>
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />

              <Text style={styles.label}>Telefone:</Text>
              <TextInput
                placeholder="Telefone"
                value={cel}
                onChangeText={setCel}
                style={styles.input}
              />

              <Text style={styles.label}>Data de Nascimento:</Text>
              <TextInput
                placeholder="Data de Nascimento"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
              />
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleEditProfile}
              >
                <Text style={styles.saveBtnText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeBtnText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditProfileModal;
