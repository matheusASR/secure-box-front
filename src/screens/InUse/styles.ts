import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { colors } from "../../styles";

interface Styles {
  container: ViewStyle;
  title: TextStyle;
  noGaiolasText: TextStyle;
  allocationContainer: ViewStyle;
  allocationTitle: TextStyle;
  allocationText: TextStyle;
  inUseAllocationsList: ViewStyle;
  buttonText: TextStyle;
  finishBtn: ViewStyle;
  paymentBtn: ViewStyle;
  finishContent: ViewStyle;
  unlockBtn: ViewStyle;
  padlock: ImageStyle;
  buttonUnlockText: TextStyle;
  noContent: ViewStyle;
  unlockedCageView: ViewStyle;
  loadingView: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
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
  },
  loadingView: {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
