import { StyleSheet } from "react-native";
import { colors } from "../../styles";

export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    noGaiolasText: {
      fontSize: 17,
      color: "gray",
    },
    allocationContainer: {
      width: "100%",
      borderRadius: 5,
      padding: 20,
      alignItems: "center",
      height: 300,
      backgroundColor: "#f0f0f0",
      justifyContent: "space-between",
    },
    allocationTitle: {
      fontSize: 22,
      fontWeight: "bold",
    },
    allocationText: {
      fontSize: 15,
      fontWeight: "bold",
    },
    inUseAllocationsList: {
      flexDirection: "column",
      gap: 20,
      paddingVertical: 20,
      marginBottom: 30  
    },
    buttonText: {
      color: "#FFF",
      fontSize: 20,
      fontWeight: "bold",
    },
    finishBtn: {
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
    paymentBtn: {
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginTop: 20,
    },
    finishContent: {
      width: "100%",
      alignItems: "center",
    },
    unlockBtn: {
      marginBottom: "20%",
      borderRadius: 5,
      width: "100%",
      alignItems: "center",
      backgroundColor: colors.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      flexDirection: "row",
      justifyContent: "space-around",
    },
    padlock: {
      width: 30,
      height: 30,
    },
    buttonUnlockText: {
      fontSize: 20,
      color: "white",
      fontWeight: "bold",
    },
    noContent: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    unlockedCageView: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "40%"
    }
  });