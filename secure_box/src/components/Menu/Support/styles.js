import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

export default styles = StyleSheet.create({
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
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 30,
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "blue",
    fontSize: 16,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  btnView: {
    marginTop: 60,
  },
  titleContact: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
  },
});
