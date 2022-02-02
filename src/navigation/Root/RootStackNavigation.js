import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TodosScreen } from '../../Screens/Todos/Todos';
import { AddTodoModalScreen } from '../../Modals/AddTodoModal/AddTodoModal';
import { SearchTodoModal } from '../../Modals/SearchTodo/SearchTodo';
import { SettingsModal } from '../../Modals/SettingsModal/SettingsModal';
import { DescriptionTodoModal } from '../../Modals/DescriptionTodoModal/DescriptionTodoModal';

const RootStack = createNativeStackNavigator();

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator mode='modal' screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name='Todos'
        component={TodosScreen}
        initialParams={{ isShowRemoveTodo: false }}
      />
      <RootStack.Group screenOptions={{ presentation: 'modal' }}>
        <RootStack.Screen
          screenOptions={{ presentation: 'modal' }}
          name='AddTodo'
          component={AddTodoModalScreen}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          screenOptions={{ presentation: 'modal' }}
          name='Search'
          component={SearchTodoModal}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          screenOptions={{ presentation: 'modal' }}
          name='Settings'
          component={SettingsModal}
          initialParams={{ isShowRemoveTodo: false }}
          options={{
            headerShown: false,
          }}
        />
        <RootStack.Screen
          screenOptions={{ presentation: 'modal' }}
          name='Description'
          component={DescriptionTodoModal}
          options={{
            headerShown: false,
          }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};
