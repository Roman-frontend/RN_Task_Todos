import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { connect, useSelector, useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { removeTodo } from '../../Redux/toolkitReducer';

export const DescriptionTodoModal = ({ navigation, route }) => {
  const dimentions = useDimensions();
  const dispatch = useDispatch();
  const {
    todoTitle,
    todoDescription,
    todoId,
    todoStatusDone,
    todoExecutionDate,
    todoExecutionTime,
  } = route.params;

  function removeTodoHandler() {
    dispatch(removeTodo(todoId));
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.8 }}>
        <Text style={styles.title}>Todo details</Text>
        <View style={[styles.item(dimentions.screen.width)]}>
          <Text style={styles.lableText}>Title: {todoTitle}</Text>
        </View>
        <View style={[styles.item(dimentions.screen.width)]}>
          <Text style={styles.lableText}>Description: {todoDescription}</Text>
        </View>
        <View style={[styles.item(dimentions.screen.width)]}>
          <Text style={styles.lableText}>
            Status: {todoStatusDone ? 'Done' : 'Not done'}
          </Text>
        </View>
        <View style={[styles.item(dimentions.screen.width)]}>
          <Text style={styles.lableText}>
            Execution date: {todoExecutionDate}
          </Text>
        </View>
        <View style={[styles.item(dimentions.screen.width)]}>
          <Text style={styles.lableText}>
            Execution time: {todoExecutionTime}
          </Text>
        </View>
        <View
          style={[
            styles.item(dimentions.screen.width),
            styles.removeView(dimentions.screen.width),
          ]}
        >
          <Text style={styles.lableText}>Delete todo: </Text>
          <View style={styles.removeTodo}>
            <Button title='Remove' color='red' onPress={removeTodoHandler} />
          </View>
        </View>
      </View>

      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <View style={[styles.footerButton, { borderColor: '#0B3C49' }]}>
          <Button
            title='Close settings'
            color='#0B3C49'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    flex: 1,
    backgroundColor: '#FEC3A6',
  },
  title: { fontSize: 24, marginBottom: 30, alignSelf: 'center' },
  item: (widthScreen) => {
    const width = widthScreen - 0;
    return {
      backgroundColor: '#FFFDFD',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginVertical: 10,
      height: 70,
      width,
    };
  },
  lableText: {
    color: 'black',
    fontSize: 20,
  },

  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  checkBox: { marginLeft: 15 },
  removeView: (widthScreen) => {
    return { flexDirection: 'row' };
  },
  removeTodo: {
    borderColor: 'red',
    backgroundColor: '#c4c4c4',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footerButton: {
    borderWidth: 3,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 80,
  },
});
