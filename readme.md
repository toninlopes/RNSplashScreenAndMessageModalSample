# An alternative for React Native Modal
I have myself been working on mobile projects using React Native for the past three years. I think React Native is a very good multiplatform framework indeed which allows us to set up mobile projects very quickly. Regardless of the various positive or negative points there is one feature that really pisses me off.

I am talking about the React Native Modal component. According with React Native Dev references, _the Modal component is a basic way to present content above an enclosing view_.

For most of the cases, React Native Modal component is fine. But when you need a bit more control over the pop up and presenting a modal message options (yes, no or something else) after a modal loading screen, it starts losing the control and ending up in undesirable behaviour like, for example, a modal that never closes.

In this article I are going to build an alternative to the React Native Modal component which I have been using. I am talking about building our own Modal component. 

## Creating our scenario
First of all, lets create our React Native Sample project. Open your terminal and on your project folder type:
```
npx react-native init RNSplashScreenAndMessageModalSample
```
Then, navigate to the project folder we have just created to install the React Navigation library and its dependencies.
```
yarn add @react-navigation/native @react-navigation/stack
```
```
yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
```
Now, let's install the iOS dependencies.
```
cd ios && pod install && cd ..  
```
And then, lets run our project on Android and iPhone.
```
npx react-native run-android
```
```
npx react-native run-ios
```
By now, we should have the Welcome to React screen on both platforms.

## Creating our navigation
Before working on our Modal we need to set up the navigation. Let's start creating the Details page.

On the project root folder, create the sub folder `src` and then, create the file `Details.js` with the snippet code below.

```javascript
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default Details = ({route, navigation}) => {
  const {page} = route.params;

  const _onNavigate = () => {
    navigation.navigate({
      name: 'Details',
      params: {
        page: page + 1,
      },
      key: page + 1,
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={[styles.text, styles.title]}>{`Page ${page}`}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={_onNavigate}>
        <Text style={styles.buttonText}>Navigate Foward</Text>
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
```

> Note the `Details.js` is a simple page where it shows the page number in the middle and the button named _Navigate Foward_ at the bottom. When the button is clicked, it navigates to itself, but it stacks the page on the navigation history.

After creating the page `Details.js`, on the project sub folder `src`, create the file `Main.js` with the snippet code below.

```javascript
import React from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default Main = ({navigation}) => {

  const _onNavigate = () => {
    navigation.navigate('Details', {page: 1});
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={[styles.text, styles.title]}>Welcome to the main page</Text>
        <Text style={[styles.text, styles.subTitle]}>Press the button "Navigate Foward"</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={_onNavigate}>
        <Text style={styles.buttonText}>Navigate Foward</Text>
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
```
> The `Main.js` page is simpler than `Details.js`. It also shows text in the middle and the button named _Navigate Foward_ at the bottom. When the button is clicked, it simply navigates to `Details.js`.

Now, on the project sub folder `src`, create the file `App.js` with the snippet code below.

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Details from './Details';

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

export default App = () => {
  return (
    <NavigationContainer>
      <MainStack/>
    </NavigationContainer>
  );
}
```
> The `App.js` is where we set up our navigation which, for a while, there are two pages: `Main` page that is set up to hide the header (`headerShown: false`); and `Details` page.

To finish the first version of our navigation settings, we need to open the file `index.js` located on the project root folder and change to the following snippet code.

```javascript
import {AppRegistry} from 'react-native';
import App from './src/App'; //Change the initial App
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

> The `index.js` is where we set up the application to use our navigation.

By now, we have something like the animated gifs below.

![alt text](/src/assets/Android_01.gif "Android_01")
![alt text](/src/assets/iPhone_01.gif "iPhone_01")

## Loading Screen
Sometimes, when the application process http requests is cool giving the user a feedback. We could present an activity indicator, an http progress or an animation while the http request is processing.

In our case, we are going to build a modal screen with transparent background and present it to give the user that feedback.

Let's start creating `LoadingScreen.js` file in src folder. Then, coding our page with the following snipped code.

```javascript
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
```

> At this point, we going to see an error when we import `NavigationRef` because we don't have it yet.

Now, we need to change our navigation settings to add `NavigationRef`. Open the file `App.js` located in `src` folder.

First, we need to import the `LoadingScreen`.

```javascript
import LoadingScreen from './LoadingScreen'; 
```
Then, we going to export the `NavigationRef` and change the method `App`.

```javascript
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
      </StackNavigator.Navigator>
    </NavigationContainer>
  );
}
```

>Note we created a stack navigator and set the mode property to `modal`. Then, we set up the first screen to `MainStack` and the second screen to our `LoadingScreen`. The magic happens when we set the options `cardOverlayEnabled: true` and `cardStyle: { backgroundColor: 'rgba(0, 0, 0, 0.4)'}`. We also created a reference to the `NavigationContainer` to have access to it in anywhere. 

Now, to see our code working we need to code two more changes: the first is on `Main.js` file; the second is on `Details.js` one.

Let's open the file `Main.js` in folder `src` and change the method `_onNavigate` with the following code. We could not forget to import the method `openLoadingScreen`.

```javascript
import {openLoadingScreen} from './LoadingScreen';
...
export default Main = ({navigation}) => {

  const _onNavigate = () => {
    openLoadingScreen();
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      navigation.navigate('Details', {page: 1});
    }, 5000);    
  }
  ...
}
```

>We are not, in fact, fetching an http request. We are simulating it using a timer which will navigate forward after 5 seconds. It is enough time to see the `LoadingScreen` working.

To finish, let's coding the same on `Details.js` page located in `src` folder.

```javascript
import {openLoadingScreen} from './LoadingScreen';
...
export default Details = ({route, navigation}) => {
  ...
  const _onNavigate = () => {
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
  }
  ...
}
```

A very important observation is that the modal does not stack the browsing history. We can check it when we navigate forward and back and notice the modal does not appear again. This behaviour is configured in `<StackNavigator.Navigator mode =" modal ">`.

So far, the result of our coding should be like the following gifs.

![alt text](/src/assets/Android_02.gif "Android_02")
![alt text](/src/assets/iPhone_02.gif "iPhone_02")

## Message Modal
React Native provides the `Alert` core component which launches an alert dialog with the specified title and message. It optionally provides a list of buttons and tapping any button will fire the respective onPress callback and dismiss the alert dialog.

But, because the `Alert` core component is design limited - we can't change its layout appearance -, sometimes, we desire building our own alert dialog with colours that follows the company's color palette and give the user a nice experience.

In our case, we are going to build a modal message likely the `Loading Screen`.

Let's start creating `Message.js` file in src folder. Then, code our page with the following snipped code.

```javascript
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
```

> Our `Message` page will receive a couple of params `const {title, message, onPressOk, onPressCancel} = route.params;` and use them to fill the title, message, buttons options and callback function to be fired. Besides that, we styled our dialog with the same colours of our application.

Now, we need to change our navigation settings. Open the file `App.js` located in `src` folder and import the `Message`.

```javascript
import Message from './Message'; 
```
Then, we going to change the method `App` and add the screen `Message`.

```javascript
export default App = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <StackNavigator.Navigator mode="modal">
        ...
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
```

To finish and see our code working we need to code the `Details.js` page.

Let's open the file `Details.js` in folder `src` and change the method `_onNavigate` with the following code. We could not forget to import the `NavigationRef` and `showMessage`.

```javascript
import {NavigationRef} from './App';
import {showMessage} from './Message';
...
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
  ...
}
```

>Note that we use the exported function `showMessage` which there are four parameters: title; message; onPressOK and; onPressCancel. onPressOk will be fired when the button Ok is pressed and the onPressCancel will be fired when the button Cancel is pressed.

And then, the result of our coding should be like the following gifs.

![alt text](/src/assets/Android_03.gif "Android_03")
![alt text](/src/assets/iPhone_03.gif "iPhone_03")

## Conclusion
In this article we coded a simple alternative to the React Native `Modal` component.

As said before, for most of cases, React Native `Modal` component is fine. But when you need a bit more control over the pop up, like present a modal message options (yes, no or something else) after a modal loading screen, it starts losing the control and ending up in undesirable behaviour.

So, that was the motivation to this article. But this article does not pretend to be a definite solution for presenting a splash screen, an activity indicator or a custom message modal. Again, that is just a simple alternative.

The article full code is available on https://github.com/aclopesjr/RNSplashScreenAndMessageModalSample.git 