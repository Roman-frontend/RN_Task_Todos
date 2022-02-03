import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import { removeTodo, doneTodo } from '../../Redux/toolkitReducer';
import { RootStackParams } from '../../navigation/types';
import { ScreenNavigationProp } from '../../navigation/types';

type Props<T extends keyof RootStackParams> = {
  todo: ITodo;
  isShowRemoveTodo: boolean;
  navigation: ScreenNavigationProp<T>;
};

interface ITodo {
  title: string;
  description?: string;
  statusDone: boolean;
  executionDate: string;
  executionTime: string;
  id: string;
}

type Style = {
  todo: ViewStyle;
};

export function Todo({
  todo,
  isShowRemoveTodo,
  navigation,
}: Props<'Todos'>): JSX.Element {
  const dispatch = useDispatch();
  const dimentions = useDimensions();

  useEffect(() => {
    showRemoveTodoHandler();
  }, [isShowRemoveTodo]);

  function showRemoveTodoHandler(): React.ReactElement {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={removeTodoHandler}
        style={{ display: isShowRemoveTodo ? 'flex' : 'none' }}
      >
        <MaterialCommunityIcons name='delete-forever' size={30} color='red' />
      </TouchableOpacity>
    );
  }

  function openModalDescription(): void {
    navigation.navigate('Description', {
      todoTitle: todo.title,
      todoDescription: todo.description,
      todoStatusDone: todo.statusDone,
      todoExecutionDate: todo.executionDate,
      todoExecutionTime: todo.executionTime,
      todoId: todo.id,
    });
  }

  function removeTodoHandler(): void {
    dispatch(removeTodo(todo.id));
  }

  function doneTodoHandler(): void {
    dispatch(doneTodo({ id: todo.id, status: !todo.statusDone }));
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={openModalDescription}>
      <View
        style={[
          styles.todo,
          { backgroundColor: todo.statusDone ? '#30ff87' : 'white' },
        ]}
      >
        <View
          style={{ flexDirection: 'row', width: dimentions.screen.width - 200 }}
        >
          <BouncyCheckbox
            size={25}
            isChecked={todo.statusDone}
            disableBuiltInState
            fillColor='red'
            unfillColor='#FFFFFF'
            iconStyle={{ borderColor: 'green' }}
            onPress={doneTodoHandler}
          />
          <Text
            style={{
              textDecorationLine: todo.statusDone ? 'line-through' : 'none',
            }}
          >
            {todo.title}
          </Text>
        </View>
        {showRemoveTodoHandler()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<Style>({
  todo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
});
