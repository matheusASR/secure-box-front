import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { cages } from "./utils";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import { InUseContext } from "../../../providers/inUseContext";
import { HomeContext } from "../../../providers/homeContext";
import { colors } from "../../../styles";

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
          <TouchableOpacity
            style={styles.startAllocationBtn}
            onPress={() => handleStartAllocation(cage)}
          >
            <Text style={styles.buttonText}>Iniciar Alocação</Text>
          </TouchableOpacity>
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
        <View style={styles.cardsContainer}>
          {cages.map((cage) => renderCageCard(cage))}
        </View>
      </ScrollView>
    </ScreenPatternStack>
  );
};

const styles = StyleSheet.create({
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
    fontWeight: "bold"
  },
  startAllocationBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default CageList;
