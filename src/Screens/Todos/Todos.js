import React, { useState, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import { Todo } from '../../components/Todo/Todo';
import { Input } from '../../components/Input/Input';
import { TodosFooterPlus } from '../../components/TodosFooterPlus/TodosFooterPlus';
import { TodosFooter } from '../../components/TodosFooter/TodosFooter';

export function TodosScreen({ navigation, route }) {
  const todos = useSelector((state) => state.toolkit.todos);
  const dimentions = useDimensions();
  const [isSearchFooter, setIsSearchFooter] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedOnlyDone, setCheckedOnlyDone] = useState(false);
  const [checkedOnlyNotDone, setCheckedOnlyNotDone] = useState(false);
  const inputRef = useRef();

  const copyTodos = useMemo(() => {
    return Array.isArray(todos) ? todos.slice(0) : [];
  }, [todos]);

  const listByCategories = useMemo(() => {
    if (checkedOnlyDone || checkedOnlyNotDone) {
      const checkedStatus = checkedOnlyDone ? true : false;

      return copyTodos.filter((todo) => {
        return todo.statusDone === checkedStatus;
      });
    }
    return copyTodos;
  }, [copyTodos, checkedAll, checkedOnlyDone, checkedOnlyNotDone]);

  const filteredTodos = useMemo(() => {
    if (inputSearchValue) {
      const regExp = new RegExp(`${inputSearchValue}`);
      return listByCategories.filter((todo) => {
        return todo.title.match(regExp);
      });
    }
    return listByCategories;
  }, [listByCategories, inputSearchValue]);

  const reversedTodos = useMemo(() => {
    const prevTodos = filteredTodos.slice(0);
    return prevTodos.reverse();
  }, [filteredTodos]);

  const searchHandler = () => {
    console.log('isSearchFooter...', isSearchFooter);
    if (isSearchFooter) {
      return inputRef.current.blur();
    }
    setIsSearchFooter(true);
    inputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', top: 0, zIndex: 1 }}>
        <Input
          checkedAll={checkedAll}
          setCheckedAll={setCheckedAll}
          checkedOnlyDone={checkedOnlyDone}
          setCheckedOnlyDone={setCheckedOnlyDone}
          checkedOnlyNotDone={checkedOnlyNotDone}
          setCheckedOnlyNotDone={setCheckedOnlyNotDone}
          value={inputSearchValue}
          setValue={setInputSearchValue}
          isSearchFooter={isSearchFooter}
          setIsSearchFooter={setIsSearchFooter}
          searchHandler={searchHandler}
          inputRef={inputRef}
        />
      </View>
      <View style={styles.todos(dimentions.screen.height, isSearchFooter)}>
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
      <TodosFooterPlus navigation={navigation} />
      <TodosFooter navigation={navigation} searchHandler={searchHandler} />
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
    const height = isOpenSearch ? heightScreen - 400 : heightScreen - 270;
    return {
      height,
      bottom: 10,
      paddingHorizontal: 40,
      paddingBottom: 20,
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
