import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDimensions } from '@react-native-community/hooks';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../Redux/toolkitReducer';
import { AddTodoFooter } from '../../components/AddTodoFooter/AddTodoFooter';
import { AddTodoDateTimePicker } from '../../components/AddTodoDateTimePicker/AddTodoDateTimePicker';

export const AddTodoModalScreen = ({ navigation }) => {
  const dimentions = useDimensions();
  const dispatch = useDispatch();
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('empty');
  const [time, setTime] = useState('empty');

  function addTodoHandler() {
    setIsClickedAdd(true);

    if (name.trim()) {
      const data = {
        title: name,
        description,
        statusDone: false,
        executionDate: date,
        executionTime: time,
      };
      dispatch(addTodo(data));
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.title}>Add to-do</Text>

          <Text style={styles.label}>Name:</Text>
          <View style={styles.item(isClickedAdd, !!!name.trim())}>
            <TextInput
              placeholder='Enter the to-do name'
              value={name}
              onChangeText={setName}
              style={styles.input(dimentions.screen)}
              multiline
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TouchableOpacity onPress={() => console.log('to-do name')}>
              <Entypo name='check' size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.errorText(isClickedAdd, !!!name.trim())}>
            Require
          </Text>

          <Text style={styles.label}>Description:</Text>
          <View style={styles.item()}>
            <TextInput
              placeholder='Enter the to-do description'
              multiline
              value={description}
              onChangeText={setDescription}
              style={styles.input(dimentions.screen)}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TouchableOpacity>
              <Entypo name='check' size={20} />
            </TouchableOpacity>
          </View>

          <AddTodoDateTimePicker setDate={setDate} setTime={setTime} />
        </View>
        <AddTodoFooter
          navigation={navigation}
          addTodoHandler={addTodoHandler}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 60, marginHorizontal: 60, flex: 1 },
  title: { fontSize: 24, marginBottom: 10, alignSelf: 'center' },
  label: { marginTop: 10 },
  item: (isClickedAdd, isError = false) => {
    return {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      padding: 15,
      borderColor: !isClickedAdd ? 'blue' : isError ? 'red' : 'green',
      borderWidth: 1,
      borderRadius: 5,
      marginVertical: 10,
    };
  },
  input: (screenSize) => {
    const width = screenSize.width - 180;
    return {
      height: 30,
      width,
    };
  },
  errorText: (isClickedAdd, isError = false) => {
    return {
      display: isClickedAdd && isError ? 'flex' : 'none',
      bottom: 10,
      color: 'red',
    };
  },
});
