import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import EditProfileModal from "./EditProfileModal";
import { api } from "../../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyAccount = () => {
  const navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [ user, setUser ] = useState({})

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
      } catch (error) {
        Toast.show(`Erro ao buscar dados do usuário: ${error}`, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });
      }
    };

    getProfile();
  }, [user]);

  const editProfile = () => {
    setIsEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };

  return (
    <>
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
        <View style={styles.dataContainer}>
          <View style={styles.dataContainerTop}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.data}>{user.name}</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.data}>{user.email}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.data}>{user.cel}</Text>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.data}>{user.birthdate}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.updateBtn} onPress={editProfile}>
              <Text style={styles.updateBtnText}>Editar Perfil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isEditModalVisible && (
        <EditProfileModal
          isVisible={isEditModalVisible}
          onClose={handleCloseModal}
          user={user}
        />
      )}
    </>
  );
};

export default MyAccount;

