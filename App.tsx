import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './src/navigation/Root/RootStackNavigation';
import { store } from './src/Redux';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
