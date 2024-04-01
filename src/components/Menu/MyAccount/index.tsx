import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import EditProfileModal from "./EditProfileModal";
import { api } from "../../../services/api";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyAccount = () => {
  const navigation: any = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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
      <ScrollView style={styles.container}>
        <View style={styles.dataContainer}>
          <View style={styles.dataContainerTop}>
            <View style={styles.personalData}>
              <Text style={styles.titleData}>Dados Pessoais:</Text>
              <Text style={styles.attrData}>Nome:</Text>
              <Text style={styles.data}>{user.name}</Text>
              <Text style={styles.attrData}>Email:</Text>
              <Text style={styles.data}>{user.email}</Text>
              <Text style={styles.attrData}>Telefone:</Text>
              <Text style={styles.data}>{user.cel}</Text>
              <Text style={styles.attrData}>Data de Nascimento:</Text>
              <Text style={styles.data}>{user.birthdate}</Text>
            </View>
            <View style={styles.addressData}>
              <Text style={styles.titleData}>Endereço:</Text>
              <Text style={styles.attrData}>CEP:</Text>
              <Text style={styles.data}>{user.address && user.address.zipCode}</Text>
              <Text style={styles.attrData}>Rua/Avenida:</Text>
              <Text style={styles.data}>{user.address && user.address.street}</Text>
              <Text style={styles.attrData}>Número:</Text>
              <Text style={styles.data}>{user.address && user.address.number}</Text>
              <Text style={styles.attrData}>Cidade:</Text>
              <Text style={styles.data}>{user.address && user.address.city}</Text>
              <Text style={styles.attrData}>Estado:</Text>
              <Text style={styles.data}>{user.address && user.address.state}</Text>
              <Text style={styles.attrData}>Complemento:</Text>
              <Text style={styles.data}>{user.address && user.address.complement}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.whiteBg}>
        <TouchableOpacity
          style={styles.updateBtn}
          onPress={() => setIsEditModalVisible(true)}
        >
          <Text style={styles.updateBtnText}>Editar Perfil</Text>
        </TouchableOpacity>
      </View>
      {isEditModalVisible && (
        <EditProfileModal
          isVisible={isEditModalVisible}
          onClose={handleCloseModal}
          user={user}
        />
      )}
    </View>
  );
};

export default MyAccount;
