import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Todo } from '../../components/Todo/Todo';
import { Input } from '../../components/Input/Input';

export function TodosScreen({ navigation, route }) {
  const todos = useSelector((state) => state.toolkit.todos);
  const dispatch = useDispatch();
  const dimentions = useDimensions();
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [value, setValue] = useState('');
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedOnlyDone, setCheckedOnlyDone] = useState(false);
  const [checkedOnlyNotDone, setCheckedOnlyNotDone] = useState(false);
  const inputRef = useRef();

  const copyTodos = useMemo(() => {
    const slicedTodos = Array.isArray(todos) ? todos.slice(0) : [];
    return slicedTodos;
  }, [todos]);

  const listByCategories = useMemo(() => {
    if (checkedOnlyDone) {
      return copyTodos.filter((todo) => {
        return todo.statusDone === true;
      });
    } else if (checkedOnlyNotDone) {
      return copyTodos.filter((todo) => {
        return todo.statusDone === false;
      });
    }
    return copyTodos;
  }, [copyTodos, checkedAll, checkedOnlyDone, checkedOnlyNotDone]);

  const filteredTodos = useMemo(() => {
    if (value) {
      const regExp = new RegExp(`${value}`);
      return listByCategories.filter((todo) => {
        return todo.title.match(regExp);
      });
    }
    return listByCategories;
  }, [listByCategories, value]);

  const reversedTodos = useMemo(() => {
    console.log('todos in Todos Screen...', todos);
    const prevTodos = filteredTodos.slice(0);
    return prevTodos.reverse();
  }, [filteredTodos]);

  useEffect(() => {
    console.log('isSearchFocus in useEffect...', isSearchFocus);
  }, [isSearchFocus]);

  const searchHandler = () => {
    if (isSearchFocus) {
      return inputRef.current.blur();
    }
    inputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <Input
        checkedAll={checkedAll}
        setCheckedAll={setCheckedAll}
        checkedOnlyDone={checkedOnlyDone}
        setCheckedOnlyDone={setCheckedOnlyDone}
        checkedOnlyNotDone={checkedOnlyNotDone}
        setCheckedOnlyNotDone={setCheckedOnlyNotDone}
        value={value}
        setValue={setValue}
        isSearchFocus={isSearchFocus}
        setIsSearchFocus={setIsSearchFocus}
        searchHandler={searchHandler}
        inputRef={inputRef}
      />
      <View style={styles.todos(dimentions.screen.height, isSearchFocus)}>
        <Pressable>
          <FlatList
            data={reversedTodos}
            inverted={true}
            renderItem={({ item }) => (
              <Todo todo={item} navigation={navigation} route={route} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Pressable>
      </View>
      <TouchableOpacity
        style={[styles.plusButton(dimentions.screen.width), styles.shadow]}
      >
        <View style={styles.viewButton}>
          <AntDesign
            name='plus'
            size={40}
            color='#ffffff'
            onPress={() => {
              navigation.navigate('AddTodo');
            }}
          />
        </View>
      </TouchableOpacity>
      <View style={[styles.footer(dimentions.screen.width), styles.shadow]}>
        <TouchableOpacity
          style={{ alignSelf: 'center', right: 15 }}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        >
          <Feather name='settings' size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ alignSelf: 'center', left: 15 }}
          onPress={searchHandler}
        >
          <AntDesign name='search1' size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00d4cd',
    justifyContent: 'space-around',
  },
  todos: (heightScreen, isOpenSearch) => {
    const height = isOpenSearch ? heightScreen - 360 : heightScreen - 230;
    return {
      height,
      bottom: 10,
      paddingHorizontal: 40,
      paddingBottom: 20,
    };
  },
  viewButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e32f45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: (widthScreen) => {
    const rightButton = widthScreen / 2 - 40;
    console.log(rightButton, widthScreen, widthScreen / 2);
    return {
      position: 'absolute',
      bottom: 70,
      left: rightButton,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
    };
  },
  footer: (widthScreen) => {
    const width = widthScreen - 40;
    console.log(width, widthScreen);
    return {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignContent: 'center',
      bottom: 30,
      left: 20,
      right: 20,
      elevation: 0,
      backgroundColor: '#ffffff',
      borderRadius: 15,
      height: 70,
      width,
    };
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
});
