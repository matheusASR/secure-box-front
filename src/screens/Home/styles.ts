import { StyleSheet } from "react-native";
import { colors } from "../../styles";

const styles = StyleSheet.create<any>({
  backBtn: {
    position: "absolute",
    left: 20,
    justifyContent: "center",
  },
  backBtnImage: {
    width: 40,
    height: 40,
  },
  header: {
    width: "100%",
    paddingVertical: 11,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    gap: 20,
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: 30,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  titleLocal: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center"
  },
  titleCageCard: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttonImage: {
    width: 120,
    height: 120,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
  },
  cageListRegistered: {
    height: "50%",
    backgroundColor: "#F0F0F0",
  },
  accessText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    paddingTop: 20,
  },
  otherAccessText: {
    fontSize: 20,
    width: "100%",
    textAlign: "center",
    marginTop: -14,
  },
  localCard: {
    backgroundColor: "white",
    height: 100,
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1
  },
  cageListScroll: {
    marginTop: 20,
  },
  localImage: {
    width: 90,
    height: 90,
    marginLeft: 40
  },
  textCardView: {
    width: "75%",
    flexDirection: "column",
    alignItems: "center"
  },
  localText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
});

export default styles;
