import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import EditProfileModal from "./EditProfileModal";
import { MenuContext } from "../../../providers/menuContext";

const MyAccount = () => {
  const navigation = useNavigation();
  const { getProfile, user, handleModal, handleCloseModal, isEditModalVisible } = useContext(MenuContext)

  useEffect(() => {
    getProfile();
  }, [user]);

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
            <TouchableOpacity style={styles.updateBtn} onPress={handleModal}>
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

