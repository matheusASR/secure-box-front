import { StyleSheet, Platform } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
  },
  termsAccept: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    paddingBottom: 20
  },
  acceptText: {
    fontSize: 14,
  },
  loadingContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainerZipCode: {
    height: 0,
    position: "absolute",
    right: 20,
    top: 683
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  signInTextContainer: {
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  signInLink: {
    marginLeft: 5,
    color: colors.primary,
    textDecorationLine: "underline",
    fontSize: 15,
  },
  accountText: {
    fontSize: 15,
  },
  sectionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 15,
  },
  passwordReqView: {
    backgroundColor: colors.secondary,
    padding: 20,
    width: "100%",
    borderRadius: 10,
    marginBottom: 20
  },
  passwordReqTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10
  },
  passwordReq: {
    fontSize: 14,
  },
  linkText: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  termsAcceptView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 3
  }
});

export default styles;
