import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Details from './Details';
import LoadingScreen from './LoadingScreen'; 
import Message from './Message';

const StackNavigator = createStackNavigator();

const MainStack = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}/>
      <StackNavigator.Screen name="Details" component={Details}/>
    </StackNavigator.Navigator>
  );
}

export const NavigationRef = React.createRef();

export default App = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <StackNavigator.Navigator mode="modal">
        <StackNavigator.Screen
          name="MainStack"
          component={MainStack}
          options={{
            headerShown: false,
          }}/>
        <StackNavigator.Screen
          name="LoadingScreen"
          component={LoadingScreen}
          options={{
            cardOverlayEnabled: true,
            cardStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            headerShown: false,
          }}
        />
        <StackNavigator.Screen
          name="Message"
          component={Message}
          options={{
            cardOverlayEnabled: true,
            cardStyle: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            },
            headerShown: false,
          }}
        />
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
