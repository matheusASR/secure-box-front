import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { colors } from "../../../styles";

interface Styles {
  modalContainer: ViewStyle;
  modalContent: ViewStyle;
  modalTitle: TextStyle;
  modalText: TextStyle;
  modalCloseBtn: ViewStyle;
  buttonText: TextStyle;
  qrcode: ImageStyle;
  paymentConfirmedView: ViewStyle;
  viewBttns: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    width: "80%",
    height: 400,
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
