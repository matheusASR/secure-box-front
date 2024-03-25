import { StyleSheet, ViewStyle, TextStyle } from "react-native";
import { colors } from "../../../styles";

interface Styles {
  container: ViewStyle;
  cardsContainer: ViewStyle;
  card: ViewStyle;
  cardText: TextStyle;
  startAllocationBtn: ViewStyle;
  buttonText: TextStyle;
  loadingContainer: ViewStyle;
}

const styles: Styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    width: "47%",
    height: 150,
    justifyContent: "space-around",
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  startAllocationBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  loadingContainer: {
    height: 400,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;

