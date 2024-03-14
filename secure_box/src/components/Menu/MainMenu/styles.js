import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    backgroundColor: colors.primary,
    paddingVertical: "10%",
    marginBottom: 20,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "30%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  fullName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  email: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "column",
    height: "70%",
    paddingHorizontal: 15,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    width: "100%",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primary,
    fontSize: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
});
