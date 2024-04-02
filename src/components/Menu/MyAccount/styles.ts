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
  titleData: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    width: "100%",
    textAlign: "left",
    backgroundColor: colors.primary,
    paddingLeft: 20,
    color: "white",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  backBtn: {
    position: "absolute",
    left: 20,
  },
  backBtnImage: {
    width: 40,
    height: 40,
  },
  updateBtn: {
    backgroundColor: colors.primary,
    marginBottom: 40,
    borderRadius: 5,
    paddingVertical: 12,
    width: "85%",
  },
  updateBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  dataContainer: {
    padding: 20,
    width: "100%",
    justifyContent: "center",
  },
  dataContainerTop: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: colors.secondary,
    width: "100%",
    padding: 15,
    gap: 5
  },
  value: {
    color: "black",
  },
  data: {
    fontSize: 16,
    width: "100%",
    paddingVertical: 10,
    padding: 5,
    borderWidth: 2,
    textAlign: "center",
    fontWeight: "bold",
    borderRadius: 5,
    marginTop: 5
  },
  whiteBg: {
    backgroundColor: "white",
    alignItems: "center",
  },
  myAccountView: {
    height: "100%",
  },
  addressData: {
    width: "100%",
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
    marginTop: 20
  },
  personalData: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    padding: 20,
  },
  attrData: {
    textAlign: "center",
    marginTop: 10
  }
});

export default styles;
