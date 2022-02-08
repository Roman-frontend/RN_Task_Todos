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
  containerHigher: ViewStyle;
  containerMain: ViewStyle;
  title: TextStyle;
  item: ViewStyle;
  content: ViewStyle;
  itemText: TextStyle;
  containerFooter: ViewStyle;
  removeView: ViewStyle;
  itemRemoveLabel: TextStyle;
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
          <Text style={[styles.itemText]}>{label}</Text>
        </View>
        <View style={[styles.content]}>
          <Text style={[styles.itemText]}>{data}</Text>
        </View>
      </View>
    );
  }

  function removeTodoHandler(): void {
    dispatch(removeTodo(todoId));
    navigation.goBack();
  }

  return (
    <View
      style={[
        styles.containerHigher,
        { height: dimentions.screen.width - 200 },
      ]}
    >
      <View style={styles.containerMain}>
        <Text style={styles.title}>Todo details</Text>
        <ScrollView>
          {createItem('Title', todoTitle)}
          {createItem('Description', todoDescription)}
          {createItem('Status', todoStatusDone ? 'Done' : 'Not done')}
          {createItem('Execution date', todoExecutionDate)}
          {createItem('Execution time', todoExecutionTime)}
          <View style={[styles.removeView, { width: dimentions.screen.width }]}>
            <Text style={[styles.itemText, styles.itemRemoveLabel]}>
              Delete todo:{' '}
            </Text>
            <View
              style={[
                styles.removeTodo,
                { width: dimentions.screen.width / 2 - 20 },
              ]}
            >
              <Button title='Remove' color='red' onPress={removeTodoHandler} />
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.containerFooter}>
        <View style={[styles.footerButton]}>
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
  containerHigher: {
    paddingVertical: 60,
    flex: 1,
  },
  containerMain: { flex: 0.9 },
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
  itemText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  containerFooter: { flex: 0.1, justifyContent: 'flex-end' },
  removeView: {
    flexDirection: 'row',
    backgroundColor: '#f0fff5',
    justifyContent: 'space-between',
    marginVertical: 1,
    minHeight: 40,
  },
  itemRemoveLabel: { alignSelf: 'center' },
  removeTodo: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  footerButton: {
    borderColor: 'blue',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    width: 200,
    alignSelf: 'center',
  },
});
