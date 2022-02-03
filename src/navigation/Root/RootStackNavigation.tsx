import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TodosScreen } from '../../Screens/Todos/Todos';
import { AddTodoModalScreen } from '../../Modals/AddTodoModal/AddTodoModal';
import { SettingsModal } from '../../Modals/SettingsModal/SettingsModal';
import { DescriptionTodoModal } from '../../Modals/DescriptionTodoModal/DescriptionTodoModal';
import { RootStackParams } from '../types';

const RootStack = createStackNavigator<RootStackParams>();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='Todos'
    >
      <RootStack.Screen
        name='Todos'
        component={TodosScreen}
        initialParams={{ isShowRemoveTodo: false }}
      />
      <RootStack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}
      >
        <RootStack.Screen name='AddTodo' component={AddTodoModalScreen} />
        <RootStack.Screen
          name='Settings'
          component={SettingsModal}
          initialParams={{ isShowRemoveTodo: false }}
        />
        <RootStack.Screen name='Description' component={DescriptionTodoModal} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
