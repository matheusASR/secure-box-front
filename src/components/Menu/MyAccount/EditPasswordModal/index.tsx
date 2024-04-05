import React from "react";
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
import { useForm, Controller } from "react-hook-form";
import { editPasswordSchema } from "./editPasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const EditPasswordModal = ({ isVisible, onClose, user }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const formData = {
      password: data.password,
    };
    const token = await AsyncStorage.getItem("@secbox:TOKEN");
    try {
      const response = await api.patch(`/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        Toast.show("Senha atualizada com sucesso!", {
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
      Toast.show(
        `Erro na atualização da senha: ${error.response.data.message}`,
        {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        }
      );
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
                <Text style={styles.headerTitle}>Editar Senha</Text>
                <TouchableOpacity
                  style={styles.closeHeaderBtn}
                  onPress={onClose}
                >
                  <Text style={styles.closeHeaderBtnText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.passwordReqView}>
                <Text style={styles.passwordReqTitle}>
                  A senha deve conter:
                </Text>
                <Text style={styles.passwordReq}>
                  Pelo menos 8 caracteres.
                </Text>
                <Text style={styles.passwordReq}>
                  Pelo menos 1 letra maiúscula.
                </Text>
                <Text style={styles.passwordReq}>
                  Pelo menos 1 número.
                </Text>
                <Text style={styles.passwordReq}>
                  Pelo menos 1 caracter especial.
                </Text>
              </View>

              <Text style={styles.label}>Nova senha:</Text>
              <Controller
                control={control}
                render={({ field }: any) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}

              <Text style={styles.label}>Confirmar senha:</Text>
              <Controller
                control={control}
                render={({ field }: any) => (
                  <TextInput
                    style={styles.input}
                    onChangeText={field.onChange}
                    value={field.value}
                  />
                )}
                name="confirmPassword"
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
            <View style={styles.viewBtns}>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={handleSubmit(onSubmit)}
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

export default EditPasswordModal;
