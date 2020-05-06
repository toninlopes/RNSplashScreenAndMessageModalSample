import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {openLoadingScreen} from './LoadingScreen';

export default Main = ({navigation}) => {

  const _onNavigate = () => {
    openLoadingScreen();
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      navigation.navigate('Details', {page: 1});
    }, 5000);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={[styles.text, styles.title]}>Welcome to the main page</Text>
        <Text style={[styles.text, styles.subTitle]}>Press the button "Navigate Forward"</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={_onNavigate}>
        <Text style={styles.buttonText}>Navigate Forward</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
} 

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    margin: 12,
  },
  title: {
    fontSize: 28,
  },
  subTitle: {
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    backgroundColor: '#000000',
    margin: 12,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  }
});