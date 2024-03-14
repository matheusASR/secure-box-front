import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

export default styles = StyleSheet.create({
    header: {
      width: "100%",
      paddingVertical: 15,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary,
      flexDirection: "row",
    },
    title: {
      color: "white",
      fontSize: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
    },
    label: {
      fontSize: 16,
      width: "100%",
      textAlign: "left",
      backgroundColor: colors.primary,
      paddingLeft: 20,
      color: "white",
      fontWeight: "bold",
      paddingVertical: 10
    },
    backBtn: {
      position: "absolute",
      left: 20,
    },
    backBtnImage: {
      width: 40,
      height: 40,
    },
    updateBtn: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      borderRadius: 5,
      marginTop: 10,
    },
    updateBtnText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    dataContainer: {
      padding: 20,
      width: "90%",
      height: 450,
      justifyContent: "space-between",
    },
    dataContainerTop: {
      justifyContent: "center",
      alignItems: "center",
    },
    data: {
      fontSize: 16,
      backgroundColor: "#E0E0E0",
      width: "100%",
      paddingVertical: 10,
      textAlign: "center",
    }
  });