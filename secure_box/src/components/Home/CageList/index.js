import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { cages } from "./utils";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import { InUseContext } from "../../../providers/inUseContext";
import { HomeContext } from "../../../providers/homeContext";

const CageList = () => {
  const { setQrcode } = useContext(HomeContext);
  const { setInUse, inUse } = useContext(InUseContext);

  const renderCageCard = (cage) => {
    return (
      <View key={cage.number} style={styles.card}>
        <Text style={styles.cardText}>Gaiola {cage.number}</Text>
        <Text style={styles.cardText}>
          {cage.inUse ? "Em uso" : "Disponível"}
        </Text>
        {!cage.inUse && (
          <Button
            title="Iniciar Alocação"
            onPress={() => handleStartAllocation(cage)}
          />
        )}
      </View>
    );
  };

  const handleStartAllocation = (cage) => {
    cage.initialTime = Date.now();
    setInUse([...inUse, cage]);
    cage.inUse = true;
  };

  return (
    <ScreenPatternStack>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Button title="< Home" onPress={() => setQrcode(false)} />
          <Text style={styles.title}>
            Selecione a gaiola que deseja utilizar:
          </Text>
        </View>
        <View style={styles.cardsContainer}>
          {cages.map((cage) => renderCageCard(cage))}
        </View>
      </ScrollView>
    </ScreenPatternStack>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    color: "black",
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CageList;
