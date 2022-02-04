import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { todosSlice } from '../../Redux/reducers/todosReducer';
import { useAppDispatch } from '../../hooks/redux';
import { Props } from '../../navigation/types';
import { ScrollView } from 'react-native-gesture-handler';

type dataElement = string | number | undefined;

type Style = {
  container: ViewStyle;
  title: TextStyle;
  item: ViewStyle;
  content: ViewStyle;
  lableText: TextStyle;
  removeView: ViewStyle;
  removeTodo: ViewStyle;
  footerButton: ViewStyle;
};

export const DescriptionTodoModal: React.FC<Props<'Description'>> = ({
  navigation,
  route,
}) => {
  const { removeTodo } = todosSlice.actions;
  const dispatch = useAppDispatch();
  const dimentions = useDimensions();
  const {
    todoTitle,
    todoDescription,
    todoId,
    todoStatusDone,
    todoExecutionDate,
    todoExecutionTime,
  } = route.params;

  function createItem(label: string, data: dataElement): JSX.Element {
    return (
      <View style={[styles.removeView, { width: dimentions.screen.width }]}>
        <View style={[styles.content]}>
          <Text style={[styles.lableText, { marginLeft: 20 }]}>{label}</Text>
        </View>
        <View style={[styles.content]}>
          <Text style={[styles.lableText, { left: 5 }]}>{data}</Text>
        </View>
      </View>
    );
  }

  function removeTodoHandler(): void {
    dispatch(removeTodo(todoId));
    navigation.goBack();
  }

  return (
    <View style={[styles.container, { height: dimentions.screen.width - 200 }]}>
      <View style={{ flex: 0.9 }}>
        <Text style={styles.title}>Todo details</Text>
        <ScrollView>
          {createItem('Title', todoTitle)}
          {createItem('Description', todoDescription)}
          {createItem('Status', todoStatusDone ? 'Done' : 'Not done')}
          {createItem('Execution date', todoExecutionDate)}
          {createItem('Execution time', todoExecutionTime)}
          <View style={[styles.removeView, { width: dimentions.screen.width }]}>
            <Text style={[styles.lableText, { left: 20, alignSelf: 'center' }]}>
              Delete todo:{' '}
            </Text>
            <View style={styles.removeTodo}>
              <Button title='Remove' color='red' onPress={removeTodoHandler} />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={{ flex: 0.1, justifyContent: 'flex-end' }}>
        <View
          style={[
            styles.footerButton,
            { borderColor: 'blue', backgroundColor: 'white' },
          ]}
        >
          <Button
            title='Close settings'
            color='blue'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<Style>({
  container: {
    paddingVertical: 60,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: 'black',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f0fff5',
    justifyContent: 'space-between',
    marginVertical: 1,
    minHeight: 40,
    paddingTop: 10,
  },
  content: {
    flexDirection: 'column',
    flex: 1,
  },
  lableText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeView: {
    flexDirection: 'row',
    backgroundColor: '#f0fff5',
    justifyContent: 'space-between',
    marginVertical: 1,
    minHeight: 40,
  },
  removeTodo: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 10,
    marginVertical: 5,
    right: 40,
  },
  footerButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    alignSelf: 'center',
  },
});
