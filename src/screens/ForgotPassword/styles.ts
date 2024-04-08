import { Platform, StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    width: "90%",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    backgroundColor: "white",
    width: "100%"
  },
});

export default styles;
