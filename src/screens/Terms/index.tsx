import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import { WebView } from 'react-native-webview';

const TermsScreen = () => {
  const navigation: any = useNavigation();
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
        source={{ uri: 'https://secbox-terms.vercel.app/SECBOX-%20TERMOS%20E%20CONDIÇÕES%20DE%20USO%20(1).pdf' }}
        style={{ flex: 1 }}
        onLoadEnd={handleLoadEnd} 
      />
    </>
  );
};

export default TermsScreen;