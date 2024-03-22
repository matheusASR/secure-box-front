import React, { createContext } from "react";
import { api } from "../services/api";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [cel, setCel] = useState(user.cel);
  const [birthdate, setBirthdate] = useState(user.birthdate);
  const [allocationsFinished, setAllocationsFinished] = useState([]);
  const [isExitModalVisible, setIsExitModalVisible] = useState(false);

  const handleLogout = () => {
    setIsExitModalVisible(true);
  };

  const handleConfirmLogout = async () => {
    setIsExitModalVisible(false);
    await AsyncStorage.removeItem("@secbox:TOKEN");
    setLogged(false);
  };

  const handleCloseExitModal = () => {
    setIsExitModalVisible(false);
  };

  const handleModal = () => {
    setIsEditModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsEditModalVisible(false);
  };

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
    } catch (error) {
      Toast.show(`Erro na atualização dos dados: ${error}`, {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const getAllocationsFinished = async () => {
    try {
      const token = await AsyncStorage.getItem("@secbox:TOKEN");
      const responseProfile = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseProfile.status === 200) {
        try {
          const responseAllocations = await api.get(
            `/allocations/${responseProfile.data.id}/userFinished`
          );
          if (responseAllocations.status === 200) {
            setAllocationsFinished(responseAllocations.data);
          } 
        } catch (error) {
          Toast.show(`Não foi possível buscar compras do usuário: ${error}`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
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

  return (
    <MenuContext.Provider
      value={{
        getProfile,
        user,
        isEditModalVisible,
        handleCloseModal,
        handleModal,
        handleEditProfile,
        setName,
        setEmail,
        setBirthdate,
        setCel,
        name,
        cel,
        birthdate,
        email,
        getAllocationsFinished,
        allocationsFinished,
        isExitModalVisible,
        handleLogout,
        handleCloseExitModal,
        handleConfirmLogout
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export { MenuProvider, MenuContext };
