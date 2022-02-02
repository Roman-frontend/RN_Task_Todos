import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDimensions } from '@react-native-community/hooks';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../Redux/toolkitReducer';
import { dateCreator } from '../../components/Helpers/DateCreator';

export const AddTodoModalScreen = (route) => {
  const dimentions = useDimensions();
  const dispatch = useDispatch();
  const [isClickedAdd, setIsClickedAdd] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date(Date.now() + 10000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  function addTodoHandler() {
    setIsClickedAdd(true);

    if (name.trim()) {
      const correctDate = dateCreator(date);
      const data = {
        title: name,
        description,
        statusDone: false,
        executionDate: show
          ? correctDate.executionDate
          : 'does not contain dates',
        executionTime: show
          ? correctDate.executionTime
          : 'does not contain times',
      };
      dispatch(addTodo(data));
      route.navigation.goBack();
    }
  }

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showModeDate = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showModeDate('date');
  };

  const showTimepicker = () => {
    showModeDate('time');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
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
          <TouchableOpacity onPress={() => console.log('to-do description')}>
            <Entypo name='check' size={20} />
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.dateBlock}>
            <Button onPress={showDatepicker} title='Set the execution time!' />
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode='date'
              is24Hour={true}
              display='default'
              onChange={onChangeDate}
              minimumDate={Date.now()}
            />
          </View>
          <View>
            <Button onPress={showTimepicker} title='Set the execution time!' />
            <DateTimePicker
              testID='dateTimePicker'
              value={date}
              mode='time'
              is24Hour={true}
              display='default'
              onChange={onChangeDate}
              minimumDate={Date.now()}
            />
          </View>
        </View>

        <View style={styles.footerButtons}>
          <View style={styles.buttonAdd}>
            <Button title='Add to-do' color='blue' onPress={addTodoHandler} />
          </View>
          <View style={styles.buttonClose}>
            <Button
              title='Close'
              color='red'
              onPress={() => {
                route.navigation.goBack(); //Дозволяє повернутися назад з попапу
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 60 },
  title: { fontSize: 24, marginBottom: 30, alignSelf: 'center' },
  label: { marginTop: 10 },
  item: (isClickedAdd, isError = false) => {
    //const backgroundColor = isDoneTodo ? 'green' : 'white';
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
  dateBlock: {
    marginVertical: 20,
  },
  footerButtons: {
    marginTop: 30,
    marginVertical: 20,
  },
  buttonClose: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonAdd: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
