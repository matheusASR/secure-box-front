import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Policies = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Button
          title="< Menu"
          onPress={() => navigation.navigate("MainMenu")}
        />
        <Text style={styles.title}>Política de Privacidade</Text>
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
export default Policies;
