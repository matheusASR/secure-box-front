import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Terms = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Button
          title="< Menu"
          onPress={() => navigation.navigate("MainMenu")}
        />
        <Text style={styles.title}>Termos e Condições de Uso</Text>
      </View>
      <View></View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontSize: 20,
  },
});

export default Terms;
