import { StyleSheet } from "react-native";
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  yesBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    width: "40%",
    borderRadius: 5,
    alignItems: "center"
  },
  closeBtn: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "40%",
    borderRadius: 5,
    alignItems: "center"
  },
  yesBtnText: {
    color: "white",
    fontSize: 18
  },
  closeBtnText: {
    color: "black",
    fontSize: 18
  },
  viewBtns: {
    flexDirection: "row",
    gap: 20
  }
});

export default styles;
