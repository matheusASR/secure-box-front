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
  ScrollView,
} from "react-native";
import styles from "./styles";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../../../../services/api";

const EditProfileModal = ({ isVisible, onClose, user }: any) => {
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
      });
      if (response.status === 200) {
        Toast.show("Usuário atualizado com sucesso!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
        onClose();
      }
    } catch (error: any) {
      Toast.show(`Erro na atualização dos dados: ${error.response.data.message}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
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
          <ScrollView style={styles.modalView}>
            <View style={styles.inputContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
                <TouchableOpacity style={styles.closeHeaderBtn} onPress={onClose}>
                  <Text style={styles.closeHeaderBtnText}>X</Text>
                </TouchableOpacity>
              </View>
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
                maxLength={11}
              />

              <Text style={styles.label}>Data de Nascimento:</Text>
              <TextInput
                placeholder="Data de Nascimento"
                value={birthdate}
                onChangeText={setBirthdate}
                style={styles.input}
                maxLength={10}
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
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditProfileModal;
