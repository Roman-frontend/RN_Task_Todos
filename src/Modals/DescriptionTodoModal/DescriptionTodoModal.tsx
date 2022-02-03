import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/types';
import { useDimensions } from '@react-native-community/hooks';
import { useDispatch } from 'react-redux';
import { removeTodo } from '../../Redux/toolkitReducer';
import { RouteProp } from '@react-navigation/core';

type ScreenNavigationProp<T extends keyof RootStackParams> =
  StackNavigationProp<RootStackParams, T>;

type ScreenRouteProp<T extends keyof RootStackParams> = RouteProp<
  RootStackParams,
  T
>;
type Props<T extends keyof RootStackParams> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};

type Style = {
  container: ViewStyle;
  title: TextStyle;
  item: ViewStyle;
  lableText: TextStyle;
  removeTodo: ViewStyle;
  footerButton: ViewStyle;
};

export const DescriptionTodoModal: React.FC<Props<'Description'>> = ({
  navigation,
  route,
}) => {
  const dimentions = useDimensions();
  const dispatch = useDispatch();
  console.log(route);
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
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Title: </Text>
          <Text style={[styles.lableText, { right: 50 }]}>{todoTitle}</Text>
        </View>
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Description: </Text>
          <Text style={[styles.lableText, { right: 50 }]}>
            {todoDescription}
          </Text>
        </View>
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Status:</Text>
          <Text style={[styles.lableText, { right: 50 }]}>
            {todoStatusDone ? 'Done' : 'Not done'}
          </Text>
        </View>
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Execution date:</Text>
          <Text style={[styles.lableText, { right: 50 }]}>
            {todoExecutionDate}
          </Text>
        </View>
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Execution time:</Text>
          <Text style={[styles.lableText, { right: 50 }]}>
            {todoExecutionTime}
          </Text>
        </View>
        <View style={[styles.item, { width: dimentions.screen.width }]}>
          <Text style={[styles.lableText, { left: 50 }]}>Delete todo: </Text>
          <View style={styles.removeTodo}>
            <Button title='Remove' color='red' onPress={removeTodoHandler} />
          </View>
        </View>
      </View>

      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
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
    backgroundColor: '#56E39F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: 'white',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#59C9A5',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 1,
    height: 70,
  },
  lableText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  removeTodo: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
    right: 40,
  },
  footerButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 90,
  },
});
