import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationRef} from './App';

export const openLoadingScreen = () => {
  NavigationRef.current?.navigate('LoadingScreen');
};

export default LoadingScreen = () => {
  return (
    <View style={styles.content}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center'
  }
});