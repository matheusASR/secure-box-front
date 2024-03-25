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
  backBtn: {
    position: "absolute",
    left: 20,
  },
  backBtnImage: {
    width: 40,
    height: 40,
  },
  noContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noPurchasesText: {
    fontSize: 17,
    color: "gray",
    textAlign: "center",
  },
  purchasesList: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    gap: 20,
    paddingVertical: 30,
  },
  allocationContainer: {
    width: "90%",
    borderWidth: 2,
    borderRadius: 5,
    paddingVertical: 40,
    alignItems: "center",
  },
  allocationTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  allocationData: {
    fontSize: 14,
    textAlign: "center",
  },
  receiptBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    width: "70%",
  },
  receiptText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;

