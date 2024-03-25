import { StyleSheet } from "react-native";
import { colors } from "../../../styles";

const styles = StyleSheet.create({
  screenAdjustTop: {
    flex: 1,
    backgroundColor: colors.primary
  },
  screenAdjustBottom: {
    flex: 0,
    backgroundColor: 'white'
  }
});

export default styles;
