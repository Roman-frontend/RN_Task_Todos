import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './src/navigation/Root/RootStackNavigation';
import 'react-native-gesture-handler';
import { setupStore } from './src/Redux';

const store = setupStore();

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
