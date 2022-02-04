import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';

export type RootStackParams = {
  Todos: { isShowRemoveTodo: boolean };
  AddTodo: undefined;
  Settings: { isShowRemoveTodo: boolean } | undefined;
  Description: {
    todoTitle: string;
    todoDescription: string | number | undefined;
    todoStatusDone: boolean;
    todoExecutionDate: string;
    todoExecutionTime: string;
    todoId: string | number;
  };
};

export type ScreenNavigationProp<T extends keyof RootStackParams> =
  StackNavigationProp<RootStackParams, T>;

export type ScreenRouteProp<T extends keyof RootStackParams> = RouteProp<
  RootStackParams,
  T
>;

export type Props<T extends keyof RootStackParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};
