import { useState } from 'react';
import { StyleSheet, TextInput, Alert, View, Button } from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { addTodo } from '../../Redux/toolkitReducer';

export const SearchTodoModal = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value}
        placeholder='Input todo name...'
        autoCorrect={false}
        autoCapitalize='none'
      />
      <View style={styles.button}>
        <EvilIcons
          name='search'
          size={30}
          onPress={() => dispatch(addTodo(value))}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row', //Ця властивість розмістить всі елементи даного view в один рядок
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 80,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignContent: 'flex-end',
    height: 50,
  },
  input: {
    width: '80%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
    marginBottom: 20,
  },
  button: {
    marginRight: 10,
  },
});
