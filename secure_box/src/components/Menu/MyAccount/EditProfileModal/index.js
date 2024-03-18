import React, { useState } from "react";
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

const EditProfileModal = ({ isVisible, onClose }) => {
  const [name, setName] = useState("Matheus Augusto Santos Rego");
  const [email, setEmail] = useState("matheusau2004@gmail.com");
  const [cel, setCel] = useState("11987111001");
  const [birthdate, setBirthdate] = useState("09/03/2004");

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
              <TextInput
                placeholder="Nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
              />
              <TextInput
                placeholder="Telefone"
                value={cel}
                onChangeText={setCel}
                style={styles.input}
              />
              <TextInput
                placeholder="Data de Nascimento"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
              />
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity style={styles.saveBtn}>
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
