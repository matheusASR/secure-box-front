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
  closeBtn: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "40%",
    borderRadius: 5,
    alignItems: "center"
  },
  closeBtnText: {
    color: "black",
    fontSize: 18
  },
  
});

export default styles;