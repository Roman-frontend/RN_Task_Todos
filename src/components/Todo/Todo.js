import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { connect, useDispatch } from 'react-redux';
import { removeTodo, doneTodo } from '../../Redux/toolkitReducer';

export function Todo({ todo, navigation, route }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { isShowRemoveTodo } = route.params;

  useEffect(() => {
    showRemoveTodoHandler();
  }, [isShowRemoveTodo]);

  function showRemoveTodoHandler() {
    if (isShowRemoveTodo) {
      return (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={removeTodoHandler}
          style={styles.deleteIcon}
        >
          <MaterialCommunityIcons name='delete-forever' size={30} color='red' />
        </TouchableOpacity>
      );
    }
    return null;
  }

  function removeTodoHandler() {
    dispatch(removeTodo(todo.id));
  }

  function doneTodoHandler() {
    dispatch(doneTodo({ id: todo.id, status: !todo.statusDone }));
  }

  console.log(todo);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('Description', {
          todoTitle: todo.title,
          todoDescription: todo.description,
          todoStatusDone: todo.statusDone,
          todoExecutionDate: todo.executionDate,
          todoExecutionTime: todo.executionTime,
          todoId: todo.id,
        });
      }}
    >
      <View style={styles.todo(todo.statusDone)}>
        <BouncyCheckbox
          size={25}
          isChecked={todo.statusDone}
          disableBuiltInState
          fillColor='red'
          unfillColor='#FFFFFF'
          text={todo.title}
          iconStyle={{ borderColor: 'blue' }}
          onPress={doneTodoHandler}
        />
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
  title: {},
  logo: {
    width: 30,
    height: 30,
  },
  deleteIcon: {},
});
