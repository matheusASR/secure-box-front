import React, { useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { HomeContext } from "../../providers/homeContext";
import ScreenPatternStack from "../../components/ScreenPattern/ScreenPatternStack";

const InUse = () => {
  const { inUse } = useContext(HomeContext);

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Gaiolas em Uso:</Text>
        {inUse.length === 0 ? (
          <Text style={styles.noGaiolasText}>
            Nenhuma gaiola em uso no momento.
          </Text>
        ) : (
          <View style={styles.inUseCagesList}>
            {inUse.map((c) => (
            <View key={c.number} style={styles.cageContainer}>
              <Text style={styles.cageText}>Gaiola {c.number}</Text>
            </View>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenPatternStack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noGaiolasText: {
    fontSize: 16,
    color: "gray",
  },
  cageContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
    alignItems: "center",
    height: 300,
    borderColor: "black",
  },
  cageText: {
    fontSize: 16,
  },
  inUseCagesList: {
    flexDirection: "column",
    gap: 20,
    paddingVertical: 50
  }
});

export default InUse;
