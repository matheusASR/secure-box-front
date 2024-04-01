import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

const styles = StyleSheet.create<any>({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  userInfo: {
    backgroundColor: colors.primary,
    paddingVertical: "10%",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
    height: "27%",
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
    paddingVertical: 6,
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
    width: 60,
    height: 60,
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  viewBalanceDeposit: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  balance: {
    fontSize: 14,
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  depositBttnText: {
    fontSize: 14,
    // color: "white",
    textAlign: "center",
    fontWeight: "bold",
    color: colors.primary
  },
  depositBttn: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    alignItems: "center",
    borderColor: "white",
    borderWidth: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
});

export default styles;
