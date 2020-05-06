import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import {NavigationRef} from './App';
import {openLoadingScreen} from './LoadingScreen';
import {showMessage} from './Message';

export default Details = ({route, navigation}) => {
  const {page} = route.params;

  const _onNavigate = () => {
    showMessage('Navigating Title',
      'Are you sure you want to navigate to the next details page?', () => {
      openLoadingScreen();
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        navigation.navigate({
          name: 'Details',
          params: {
            page: page + 1,
          },
          key: page + 1,
        });
      }, 5000);
    }, () => {
      NavigationRef.current?.goBack();
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={[styles.text, styles.title]}>{`Page ${page}`}</Text>
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