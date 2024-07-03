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
        source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://secbox-terms.vercel.app/SECBOX-%20TERMOS%20E%20CONDIÇÕES%20DE%20USO%20(1).pdf' }}
        style={{ flex: 1 }}
        onLoadEnd={handleLoadEnd} 
      />
    </>
  );
};

export default TermsScreen;
