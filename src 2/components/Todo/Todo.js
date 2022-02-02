import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { connect, useDispatch } from 'react-redux';
//import { deleteTodo as deleteTodoDispatch } from '../../redux/actions/todo';

export function Todo({ todo, navigation }) {
  const dispatch = useDispatch();
  //const deleteTodo = (data) => dispatch(deleteTodoDispatch(data));
  const [checked, setChecked] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.navigate('Description');
      }}
    >
      <View style={styles.todo(checked)}>
        <BouncyCheckbox
          size={25}
          fillColor='red'
          unfillColor='#FFFFFF'
          text={todo}
          iconStyle={{ borderColor: 'blue' }}
          onPress={() => setChecked(!checked)}
        />
        <TouchableOpacity
          activeOpacity={0.5}
          //onPress={() => deleteTodo({ tabName, id: todo.id })}
          style={styles.deleteIcon}
        >
          <MaterialCommunityIcons name='delete-forever' size={30} color='red' />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  todo: (isDoneTodo) => {
    const backgroundColor = isDoneTodo ? 'green' : 'white';
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
