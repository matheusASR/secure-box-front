import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { colors } from "../../../styles";

const styles = StyleSheet.create<any>({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  attentionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20
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
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "90%",
    justifyContent: "space-between",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center"
  },
  modalCloseBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrcode: {
    width: "100%",
    height: "45%",
  },
  paymentConfirmedView: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "50%",
  },
  viewBttns: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default styles;
