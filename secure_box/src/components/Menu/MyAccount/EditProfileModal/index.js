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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../../services/api";

const EditProfileModal = ({ isVisible, onClose, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cel, setCel] = useState(user.cel);
  const [birthdate, setBirthdate] = useState(user.birthdate);

  const handleEditProfile = async () => {
    const formData = {
      name: name,
      email: email,
      cel: cel,
      birthdate: birthdate,
    };
    const token = await AsyncStorage.getItem("@secbox:TOKEN");
    try {
      const response = await api.patch(`/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.statusText === "OK") {
        console.log("Usuário atualizado com sucesso!")
        // setTimeout(() => {
        //   window.location.reload()
        // }, 1500)
        onClose();
      }
    } catch (error) {
      toast.error(`Erro ao atualizar usuário: ${error}`)
    }
  };

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
