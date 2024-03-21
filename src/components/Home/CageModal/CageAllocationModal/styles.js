import { StyleSheet } from "react-native";
import { colors } from "../../../../styles";

export default styles = StyleSheet.create({
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
    width: "90%"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  startBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    width: "40%",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  closeBtn: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "40%",
    borderRadius: 5,
    alignItems: "center"
  },
  startBtnText: {
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
  },
  detailsView: {
    width: "100%",
    alignItems: "center",
    marginVertical: 50
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10
  },
  detailsText: {
    fontSize: 16
  },
  openedPadlock: {
    width: 20,
    height: 20
  },
  allocationStartedView: {
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  closeBtnAlt: {
    padding: 10,
    backgroundColor: "#F0F0F0",
    width: "100%",
    borderRadius: 5,
    alignItems: "center"
  },
  detailsTextAlt: {
    textAlign: "center",
  }
});
