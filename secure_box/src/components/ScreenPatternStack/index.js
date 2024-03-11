import React from "react";

import {
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import GlobalStyles from "../../styles";
import styles from "./styles";

export default function ScreenPatternStack({ children }) {
  return (
    <>
      <SafeAreaView style={styles.screenAdjustTop}>
        <StatusBar />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={GlobalStyles.fill}
        >
          {children}
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView style={styles.screenAdjustBottom} />
    </>
  );
}