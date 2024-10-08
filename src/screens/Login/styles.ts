import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  registerText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  registerLink: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 16,
    textAlign: "center",
  },
  logoView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -160,
  },
  logo: {
    width: 130,
    height: 130,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 15,
  },
  rowDirectionView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
    gap: 5
  },
  forgotPass: {
    fontSize: 16,
  },
  clickHere: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 16,
  },
  loadingContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
