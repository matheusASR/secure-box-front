import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { cages } from "./utils";
import ScreenPatternStack from "../../ScreenPattern/ScreenPatternStack";
import { InUseContext } from "../../../providers/inUseContext";
import styles from "./styles";

const CageList = () => {
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

export default CageList;
