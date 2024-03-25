import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

const styles = StyleSheet.create({
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
    titleData: {
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
      paddingBottom: 20
    },
    titleDataAddress: {
      color: "black",
      fontWeight: "bold",
      fontSize: 20,
      paddingVertical: 20,
    },
    container: {
      flex: 1,
      backgroundColor: "white",
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
      marginBottom: 40,
      borderRadius: 5,
      paddingVertical: 12,
      width: "90%"
    },
    updateBtnText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
    },
    dataContainer: {
      padding: 20,
      width: "100%",
      justifyContent: "center",
      
    },
    dataContainerTop: {
      justifyContent: "center",
      alignItems: "center",
      
    },
    data: {
      fontSize: 16,
      width: "100%",
      paddingVertical: 10,
      textAlign: "left",
      borderWidth: 1,
      padding: 5
    },
    whiteBg: {
      backgroundColor: "white",
      alignItems: "center"
    },
    myAccountView: {
      height: "100%"
    }
});

export default styles;
