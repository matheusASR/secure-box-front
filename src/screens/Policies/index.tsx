import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "./styles";

const PoliciesScreen = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <WebView
        source={{ uri: 'https://secbox-policies.vercel.app/SECBOX-%20POL%C3%8DTICA%20GERAL%20DE%20PRIVACIDADE%20E%20PROTE%C3%87%C3%83O%20DE%20DADOS%20(1).pdf' }}
        style={{ flex: 1 }}
        onLoadEnd={handleLoadEnd}
      />
    </>
  );
};

export default PoliciesScreen;
