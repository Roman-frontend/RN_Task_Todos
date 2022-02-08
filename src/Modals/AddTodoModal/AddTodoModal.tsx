import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDimensions } from '@react-native-community/hooks';
import { todosSlice } from '../../Redux/reducers/todosReducer';
import { AddTodoFooter } from './Footer';
import { AddTodoDateTimePicker } from './DateTimePicker';
import { Props } from '../../navigation/types';
import { useAppDispatch } from '../../hooks/redux';
import { Todo } from '../../Redux/reducers/todosReducer';

type Style = {
  container: ViewStyle;
  mainContainer: ViewStyle;
  label: TextStyle;
  title: TextStyle;
  item: ViewStyle;
  input: ViewStyle;
  errorText: TextStyle;
};

export const AddTodoModalScreen = ({ navigation }: Props<'Todos'>) => {
  const { addTodo } = todosSlice.actions;
  const dispatch = useAppDispatch();
  const dimentions = useDimensions();
  const [isClickedAdd, setIsClickedAdd] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('empty');
  const [time, setTime] = useState<string>('empty');
  const inputNameRef = useRef<any>();

  useEffect(() => {
    inputNameRef?.current?.focus();
  }, []);

  function addTodoHandler(): void {
    setIsClickedAdd(true);

    if (name.trim()) {
      const data: Todo = {
        title: name,
        description,
        statusDone: false,
        executionDate: date,
        executionTime: time,
        id: Math.random(),
      };
      dispatch(addTodo(data));
      navigation.goBack();
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Add to-do</Text>

          <Text style={styles.label}>Name:</Text>
          <View
            style={[
              styles.item,
              {
                borderColor: !isClickedAdd
                  ? 'blue'
                  : !!!name.trim()
                  ? 'red'
                  : 'green',
              },
            ]}
          >
            <TextInput
              placeholder='Enter the to-do name'
              value={name}
              onChangeText={setName}
              ref={inputNameRef}
              style={[styles.input, { width: dimentions.screen.width - 180 }]}
              multiline
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TouchableOpacity>
              <Entypo name='check' size={20} />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.errorText,
              { display: isClickedAdd && !!!name.trim() ? 'flex' : 'none' },
            ]}
          >
            Require
          </Text>

          <Text style={styles.label}>Description:</Text>
          <View style={styles.item}>
            <TextInput
              placeholder='Enter the to-do description'
              multiline
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { width: dimentions.screen.width - 180 }]}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TouchableOpacity>
              <Entypo name='check' size={20} />
            </TouchableOpacity>
          </View>

          <AddTodoDateTimePicker setDate={setDate} setTime={setTime} />
        </View>
        <AddTodoFooter addTodoHandler={addTodoHandler} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create<Style>({
  container: { marginTop: 60, marginHorizontal: 60, flex: 1 },
  mainContainer: { flex: 0.8 },
  title: { fontSize: 24, marginBottom: 10, alignSelf: 'center' },
  label: { marginTop: 10 },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  input: { height: 30 },
  errorText: {
    bottom: 10,
    color: 'red',
  },
});
