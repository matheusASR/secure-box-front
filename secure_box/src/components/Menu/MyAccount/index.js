import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import EditProfileModal from "./EditProfileModal";

const MyAccount = () => {
  const navigation = useNavigation();
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
            <Text style={styles.data}>Matheus Augusto Santos Rego</Text>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.data}>matheusau2004@gmail.com</Text>
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.data}>(11) 98711-1001</Text>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <Text style={styles.data}>09/03/2004</Text>
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
        />
      )}
    </>
  );
};

export default MyAccount;

