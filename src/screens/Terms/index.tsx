import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from 'react-native-webview';
import styles from "./styles";

const TermsScreen = () => {
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
        source={{ uri: 'https://secbox-terms.vercel.app/SECBOX-%20TERMOS%20E%20CONDI%C3%87%C3%95ES%20DE%20USO%20(1).pdf' }}
        style={{ flex: 1 }}
        onLoadEnd={handleLoadEnd} 
      />
    </>
  );
};

export default TermsScreen;
