import React, { useState, useMemo, useRef, FC } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ViewStyle,
  TextInput,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { Todo } from './Todo';
import { Input } from './Input';
import { TodosFooterPlus } from './PlusFooter';
import { TodosFooter } from './Footer';
import { useNavigation } from '@react-navigation/native';
import { Props, ScreenNavigationProp } from '../../navigation/types';
import { useAppSelector } from '../../hooks/redux';

type Style = {
  container: ViewStyle;
  todos: ViewStyle;
};

export const TodosScreen: FC<Props<'Todos'>> = ({ route }) => {
  const { todos } = useAppSelector((state) => state.todosReducer);
  const dimentions = useDimensions();
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();
  const [isSearchFooter, setIsSearchFooter] = useState<boolean>(false);
  const [inputSearchValue, setInputSearchValue] = useState<string>('');
  const [checkedAll, setCheckedAll] = useState<boolean>(true);
  const [checkedOnlyDone, setCheckedOnlyDone] = useState<boolean>(false);
  const [checkedOnlyNotDone, setCheckedOnlyNotDone] = useState<boolean>(false);
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

  const searchHandler = (): void => {
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
      <TodosFooter searchHandler={searchHandler} />
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
