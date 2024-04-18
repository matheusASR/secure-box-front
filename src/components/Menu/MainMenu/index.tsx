import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import ExitModal from "./ExitModal";
import { LoginContext } from "../../../providers/loginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { api } from "../../../services/api";
import DepositModal from "../Deposits/DepositModal";
import { InUseContext } from "../../../providers/inUseContext";

const MainMenu = () => {
  const navigation: any = useNavigation();
  const [isExitModalVisible, setIsExitModalVisible] = useState<any>(false);
  const [isDepositModalVisible, setIsDepositModalVisible] =
    useState<any>(false);
  const { setLogged } = useContext(LoginContext);
  const [user, setUser] = useState<any>({});
  const [username, setUsername] = useState<any>("");
  const { finishPayAllocation } = useContext(InUseContext)

  const getFirstName = (fullName: string) => {
    const firstSpaceIndex = fullName.indexOf(" ");
    return firstSpaceIndex !== -1
      ? fullName.substring(0, firstSpaceIndex)
      : fullName;
  };

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
          const firstName = getFirstName(response.data.name);
          setUsername(firstName);
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
  }, [isDepositModalVisible, finishPayAllocation]);

  const handleDepositModal = () => {
    setIsDepositModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    setIsExitModalVisible(false);
    await AsyncStorage.removeItem("@secbox:TOKEN");
    setLogged(false);
  };

  const handleCloseExitModal = () => {
    setIsExitModalVisible(false);
  };

  const handleCloseDepositModal = () => {
    setIsDepositModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={require("../../../../assets/ProfileImage.png")}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>Olá, {username}</Text>
        <View style={styles.viewBalanceDeposit}>
          {user.wallet && (
            <Text style={styles.balance}>
              Saldo: R${user.wallet.balance}
            </Text>
          )}
          <TouchableOpacity
            style={styles.depositBttn}
            onPress={handleDepositModal}
          >
            <Text style={styles.depositBttnText}>Depositar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MyAccount")}
        >
          <Image
            source={require("../../../../assets/ProfileImage.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Deposits")}
        >
          <Image
            source={require("../../../../assets/Deposit.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Meus Depósitos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Purchases")}
        >
          <Image
            source={require("../../../../assets/Shop.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Minhas Alocações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Terms")}
        >
          <Image
            source={require("../../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Termos e Condições de Uso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Policies")}
        >
          <Image
            source={require("../../../../assets/Terms.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Política de Privacidade</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Support")}
        >
          <Image
            source={require("../../../../assets/Support.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Image
            source={require("../../../../assets/Notification.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsExitModalVisible(true)}
        >
          <Image
            source={require("../../../../assets/Exit.png")}
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
      {isExitModalVisible && (
        <ExitModal
          isVisible={isExitModalVisible}
          onClose={handleCloseExitModal}
          onConfirm={handleConfirmLogout}
        />
      )}
      {isDepositModalVisible && (
        <DepositModal
          isVisible={isDepositModalVisible}
          onClose={handleCloseDepositModal}
          user={user}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default MainMenu;
