import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDispatch } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import { removeTodo, doneTodo } from '../../Redux/toolkitReducer';

export function Todo({ todo, navigation, route }) {
  const dispatch = useDispatch();
  const { isShowRemoveTodo } = route.params;
  const dimentions = useDimensions();

  useEffect(() => {
    showRemoveTodoHandler();
  }, [isShowRemoveTodo]);

  function showRemoveTodoHandler() {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={removeTodoHandler}
        style={[
          styles.deleteIcon,
          { display: isShowRemoveTodo ? 'flex' : 'none' },
        ]}
      >
        <MaterialCommunityIcons name='delete-forever' size={30} color='red' />
      </TouchableOpacity>
    );
  }

  function openModalDescription() {
    navigation.navigate('Description', {
      todoTitle: todo.title,
      todoDescription: todo.description,
      todoStatusDone: todo.statusDone,
      todoExecutionDate: todo.executionDate,
      todoExecutionTime: todo.executionTime,
      todoId: todo.id,
    });
  }

  function removeTodoHandler() {
    dispatch(removeTodo(todo.id));
  }

  function doneTodoHandler() {
    dispatch(doneTodo({ id: todo.id, status: !todo.statusDone }));
  }

  return (
    <TouchableOpacity activeOpacity={0.5} onPress={openModalDescription}>
      <View style={styles.todo(todo.statusDone)}>
        <View style={styles.checkBox(dimentions.screen.width)}>
          <BouncyCheckbox
            size={25}
            isChecked={todo.statusDone}
            disableBuiltInState
            fillColor='red'
            unfillColor='#FFFFFF'
            iconStyle={{ borderColor: 'green' }}
            onPress={doneTodoHandler}
          />
          <Text style={styles.todoTitle(todo.statusDone)}>{todo.title}</Text>
        </View>
        {showRemoveTodoHandler()}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: (isDoneTodo) => {
    const backgroundColor = isDoneTodo ? '#30ff87' : 'white';
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      padding: 15,
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
    };
  },
  checkBox: (widthScreen) => {
    const width = widthScreen - 200;
    return { flexDirection: 'row', width };
  },
  todoTitle: (status) => {
    return { textDecorationLine: status ? 'line-through' : 'none' };
  },
});
