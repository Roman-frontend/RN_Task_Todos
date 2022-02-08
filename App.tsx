import React from 'react';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackScreen } from './src/navigation/Root/RootStackNavigation';
import store, { persistor } from './src/Redux';
import { Loader } from './src/components/Loader/Loader';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
