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
import { removeAllTodos } from '../../Redux/toolkitReducer';

const CONFIRM_REMOVE_TEXT = 'Remove all todos';

export const SettingsModal = ({ navigation, route }) => {
  const { isShowRemoveTodo } = route.params;
  const dimentions = useDimensions();
  const dispatch = useDispatch();
  const [isCheckedShowRemoveButton, setIsCheckedShowRemoveButton] =
    useState(isShowRemoveTodo);
  const [inputValue, setInputValue] = useState('');
  const [isShowInputConfirm, setIsShowInputConfirm] = useState(false);
  const [isFailConfirm, setIsFailConfirm] = useState(false);
  const [isShowAlertRemovedAll, setIsShowAlertRemovedAll] = useState(false);

  function showRemoveButtonTodoHandler() {
    isCheckedShowRemoveButton
      ? hideRemoveButtonHandler()
      : showRemoveButtonHandler();
  }

  function showRemoveButtonHandler() {
    setIsCheckedShowRemoveButton(true);
    navigation.setParams({ isShowRemoveTodo: true });
  }

  function hideRemoveButtonHandler() {
    setIsCheckedShowRemoveButton(false);
    navigation.setParams({ isShowRemoveTodo: false });
  }

  function removeAllHandler() {
    if (isShowInputConfirm && inputValue === CONFIRM_REMOVE_TEXT) {
      dispatch(removeAllTodos());
      setIsShowAlertRemovedAll(true);
    } else if (isShowInputConfirm) {
      setIsFailConfirm(true);
    } else {
      setIsShowInputConfirm(true);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.8 }}>
        <Text style={styles.title}>To-do list settings</Text>
        <View style={[styles.checkShowRemove(dimentions.screen.width)]}>
          <BouncyCheckbox
            size={30}
            fillColor='black'
            unfillColor='#FFFFFF'
            text='Show remove button'
            isChecked={isCheckedShowRemoveButton}
            disableBuiltInState
            style={styles.checkBox}
            iconStyle={{ borderColor: 'blue' }}
            textStyle={{
              textDecorationLine: 'none',
              fontSize: 20,
            }}
            onPress={showRemoveButtonTodoHandler}
          />
        </View>

        <View style={{ marginVertical: 20 }}>
          <Text style={{ fontSize: 24, alignSelf: 'center', marginBottom: 10 }}>
            Remove all todos:
          </Text>
          <View style={styles.buttonRemoveAll}>
            <Button title='Remove' color='red' onPress={removeAllHandler} />
          </View>
          {isShowAlertRemovedAll ? (
            <View style={styles.successRemoved(dimentions.screen.width)}>
              <Text style={styles.successRemovedLabel}>
                All tasks successfully deleted.
              </Text>
            </View>
          ) : (
            isShowInputConfirm && (
              <View style={styles.inputConfirm(dimentions.screen.width)}>
                <Text style={styles.inputLabel}>
                  Please type: "{CONFIRM_REMOVE_TEXT}" - to confirm.
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={`  ${CONFIRM_REMOVE_TEXT}`}
                    value={inputValue}
                    style={styles.inputFieldConfirm(dimentions.screen)}
                    onChangeText={setInputValue}
                    onPress={() => searchSettingsHandler('all')}
                    onEndEditing={removeAllHandler}
                    multiline
                    autoCorrect={false}
                    autoCapitalize='none'
                  />
                  <TouchableOpacity
                    style={{ alignSelf: 'center' }}
                    onPress={removeAllHandler}
                  >
                    <Entypo name='check' size={20} />
                  </TouchableOpacity>
                </View>
                {isFailConfirm && (
                  <Text style={styles.errorText(isFailConfirm)}>
                    Fail confirm
                  </Text>
                )}
              </View>
            )
          )}
        </View>
      </View>

      <View style={{ flex: 0.2, justifyContent: 'flex-end' }}>
        <View style={[styles.footerButton, { borderColor: 'blue' }]}>
          <Button
            title='Apply settings'
            onPress={() => {
              navigation.navigate('Todos', { isShowRemoveTodo });
            }}
          />
        </View>
        <View style={[styles.footerButton, { borderColor: 'red' }]}>
          <Button
            title='Close settings'
            color='red'
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
  container: { marginVertical: 60, marginHorizontal: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 30, alignSelf: 'center' },
  checkShowRemove: (widthScreen) => {
    const width = widthScreen - 80;
    return {
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      alignItems: 'left',
      marginVertical: 20,
      height: 50,
      width,
      left: 20,
      right: 20,
    };
  },
  successRemoved: (widthScreen) => {
    const width = widthScreen - 60;
    return {
      backgroundColor: '#ffffff',
      alignItems: 'center',
      height: 50,
      width,
      bottom: 10,
      left: 10,
      right: 20,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    };
  },
  successRemovedLabel: {
    marginTop: 10,
    fontSize: 18,
  },
  inputConfirm: (widthScreen) => {
    const width = widthScreen - 60;
    return {
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      alignItems: 'left',
      height: 140,
      width,
      left: 10,
      right: 20,
      bottom: 10,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    };
  },
  inputLabel: {
    color: 'black',
    fontSize: 15,
    marginLeft: 10,
    fontSize: 18,
  },
  inputFieldConfirm: (screenSize) => {
    const width = screenSize.width - 140;
    return {
      marginHorizontal: 20,
      borderBottomWidth: 1,
      borderColor: 'blue',
      width,
      fontSize: 20,
    };
  },
  errorText: (isFail) => {
    return {
      color: 'red',
      marginLeft: 20,
      bottom: 20,
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
  checkBox: { marginLeft: 15 },
  buttonRemoveAll: {
    borderColor: 'red',
    backgroundColor: '#c4c4c4',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  footerButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 50,
  },
});
