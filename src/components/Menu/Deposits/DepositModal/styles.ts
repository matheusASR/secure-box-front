import { Platform, StyleSheet } from "react-native";
import { colors } from "../../../../styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
    width: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
  },
  closeBtn: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "45%",
    borderRadius: 5,
    alignItems: "center",
  },
  nextBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    width: "45%",
    borderRadius: 5,
    alignItems: "center",
  },
  nextBtnText: {
    color: "white",
    fontSize: 18,
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%"
  },
  closeBtnText: {
    color: "black",
    fontSize: 18,
  },
  optionBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginTop: 20
  },
  selectedOptionBtn: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    borderWidth: 2
  },
  viewOptions: {
    width: "100%",
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  optionBtnText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
  },
  optionBtnImage: {
    width: 40,
    height: 40,
  },
  addPaymentMethodBtn: {
    width: "100%",
    paddingVertical: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20
  },
  addPaymentMethodBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  qrCodePixView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  qrCodeText: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "center"
  },
  copyCodeBtn: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20
  },
  loadingContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  copyCodeBtnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  alreadyPaidBtn: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginTop: 20
  },
  alreadyPaidBtnText: {
    color: colors.primary,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17,
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%"
  },
  header: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginBottom: 15
  },
  closeHeaderBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    width: 35,
    height: 35,
    alignItems: "center",
    justifyContent: "center"
  },
  closeHeaderBtnText: {
    fontSize: 18,
    color: "white"
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default styles;
