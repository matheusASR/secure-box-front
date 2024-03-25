import { StyleSheet, Platform } from "react-native";
import { colors } from "../../../../styles";

export default styles = StyleSheet.create({
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
    elevation: 5,
    width: "90%",
    maxHeight: "60%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "100%"
  },
  inputContainer: {
    width: "100%"
  },
  saveBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    width: "48%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  closeBtn: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "48%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  saveBtnText: {
    color: "white",
    fontSize: 18
  },
  closeBtnText: {
    color: "black",
    fontSize: 18
  },
  viewBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 50
  },
  label: {
    marginBottom: 10
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
  }
});