import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import EditProfileModal from "./EditProfileModal";
import { api } from "../../../services/api";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditPasswordModal from "./EditPasswordModal";

const MyAccount = () => {
  const navigation: any = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isEditPasswordModalVisible, setIsEditPasswordModalVisible] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = await AsyncStorage.getItem("@secbox:TOKEN");
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error: any) {
        Toast.show(
          `Erro ao buscar dados do usuário: ${error.response.data.message}`,
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

    getProfile();
  }, [isEditModalVisible]);

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };

  const handleClosePasswordModal = () => {
    setIsEditPasswordModalVisible(false);
  };

  function formatPhoneNumber(phoneNumber: any) {
    const formattedPhoneNumber = `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
    return formattedPhoneNumber;
}

  return (
    <View style={styles.myAccountView}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.navigate("MainMenu")}
        >
          <Image
            style={styles.backBtnImage}
            source={require("../../../../assets/BackBtn.png")}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Minha Conta</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.dataContainerTop}>
          <View style={styles.viewData}>
            <Text style={styles.attrData}>Nome:</Text>
            <Text style={styles.data}>{user.name}</Text>
          </View>
          <View style={styles.viewData}>
            <Text style={styles.attrData}>Email:</Text>
            <Text style={styles.data}>{user.email}</Text>
          </View>
          <View style={styles.viewData}>
            <Text style={styles.attrData}>Telefone:</Text>
            <Text style={styles.data}>{user.cel && formatPhoneNumber(user.cel)}</Text>
          </View>
          <View style={styles.viewData}>
            <Text style={styles.attrData}>Data de Nascimento:</Text>
            <Text style={styles.data}>{user.birthdate}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text style={styles.updateBtnText}>Editar Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => setIsEditPasswordModalVisible(true)}
        >
          <Text style={styles.updateBtnText}>Alterar Senha</Text>
        </TouchableOpacity>
      </View>
      {isEditModalVisible && (
        <EditProfileModal
          isVisible={isEditModalVisible}
          onClose={handleCloseModal}
          user={user}
        />
      )}
      {isEditPasswordModalVisible && (
        <EditPasswordModal
          isVisible={isEditPasswordModalVisible}
          onClose={handleClosePasswordModal}
          user={user}
        />
      )}
    </View>
  );
};

export default MyAccount;
