import React, { useState, useMemo, useRef, FC } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ViewStyle,
  TextInput,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import { Todo } from '../../components/Todo/Todo';
import { Input } from '../../components/Input/Input';
import { TodosFooterPlus } from '../../components/TodosFooterPlus/TodosFooterPlus';
import { TodosFooter } from '../../components/TodosFooter/TodosFooter';
import { useNavigation } from '@react-navigation/native';
import { Props, ScreenNavigationProp } from '../../navigation/types';

interface ITodo {
  title: string;
  description?: string;
  statusDone: boolean;
  executionDate: string;
  executionTime: string;
  id: string;
}

interface ITodos {
  toolkit: {
    todos: ITodo[];
  };
}

type Style = {
  container: ViewStyle;
  todos: ViewStyle;
};

export const TodosScreen: FC<Props<'Todos'>> = ({ route }) => {
  const todos = useSelector((state: ITodos) => state.toolkit.todos);
  const dimentions = useDimensions();
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();
  const [isSearchFooter, setIsSearchFooter] = useState(false);
  const [inputSearchValue, setInputSearchValue] = useState('');
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedOnlyDone, setCheckedOnlyDone] = useState(false);
  const [checkedOnlyNotDone, setCheckedOnlyNotDone] = useState(false);
  const inputRef = useRef<TextInput | undefined>();

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
    if (isSearchFooter) {
      return inputRef?.current?.blur();
    }
    setIsSearchFooter(true);
    inputRef?.current?.focus();
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
      <View
        style={[
          styles.todos,
          {
            height: isSearchFooter
              ? dimentions.screen.height - 400
              : dimentions.screen.height - 270,
          },
        ]}
      >
        <Pressable>
          <FlatList
            data={reversedTodos}
            inverted={true}
            renderItem={({ item }) => (
              <Todo
                todo={item}
                isShowRemoveTodo={route.params.isShowRemoveTodo}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </Pressable>
      </View>
      <TodosFooterPlus />
      <TodosFooter navigation={navigation} searchHandler={searchHandler} />
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#00d4cd',
    justifyContent: 'space-around',
  },
  todos: {
    bottom: 10,
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
});
