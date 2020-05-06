import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {NavigationRef} from './App';

export const showMessage = (title, message, onPressOk, onPressCancel) => {
  NavigationRef.current?.navigate({
    name: 'Message',
    params: {
      title,
      message,
      onPressOk,
      onPressCancel
  }});
};

export default Message = ({route}) => {
  const {title, message, onPressOk, onPressCancel} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.titleView}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contentView}>
          <Text>{message}</Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity style={[styles.button, styles.okButton]} onPress={onPressOk}>
            <Text style={styles.title}>Ok</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.okCancel]} onPress={onPressCancel}>
            <Text style={styles.title}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  content: {
    marginHorizontal: 20,
    backgroundColor: 'white',
  },
  titleView: {
    backgroundColor: 'black',
    padding: 6,
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  contentView: {
    padding: 20,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 6,
  },
  okButton: {
    borderRightColor: 'white',
    borderWidth: 1,
  },
  okCancel: {
    borderLeftColor: 'white',
    borderWidth: 1,
  }
});