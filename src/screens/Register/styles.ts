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
  loadingContainer: {
    height: 500,
    alignItems: "center",
    justifyContent: "center",
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
});

export default styles;
