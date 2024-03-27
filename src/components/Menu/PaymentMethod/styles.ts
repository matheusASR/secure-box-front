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
  paymentMethodContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  paymentMethodCard: {
    backgroundColor: colors.secondary,
    width: "90%",
    padding: 10,
    borderRadius: 15,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 30
  },
  cardType: {
    fontSize: 22,
    color: colors.primary,
    position: "absolute",
    fontWeight: "bold",
    bottom: 150,
    left: 20,
  },
  cardNumber: {
    fontSize: 22,
    color: colors.primary,
    position: "absolute",
    fontWeight: "bold",
    bottom: 110,
    left: 20,
  },
  expirationDate: {
    fontSize: 16,
    color: colors.primary,
    position: "absolute",
    fontWeight: "bold",
    bottom: 80,
    left: 20,
  },
  cardHolderName: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  cardDefault: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "bold",
    position: "absolute",
    bottom: 10,
    right: 20,
  },
  removeCardBttn: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  removeCardBttnText: {
    fontSize: 16,
    color: colors.primary,
  },
  addPaymentBtn: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
    marginTop: 20,
    width: "90%",
  },
  addPaymentBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;
