import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import { useDispatch } from 'react-redux';
import Entypo from 'react-native-vector-icons/Entypo';
import { removeAllTodos } from '../../Redux/toolkitReducer';

const CONFIRM_REMOVE_TEXT = 'Remove all todos';

export function SettingsRemoveAllTodos() {
  const dispatch = useDispatch();
  const dimentions = useDimensions();
  const [inputValue, setInputValue] = useState('');
  const [isShowInputConfirm, setIsShowInputConfirm] = useState(false);
  const [isFailConfirm, setIsFailConfirm] = useState(false);
  const [isShowAlertRemovedAll, setIsShowAlertRemovedAll] = useState(false);

  function removeAllHandler() {
    if (isShowInputConfirm && inputValue === CONFIRM_REMOVE_TEXT) {
      dispatch(removeAllTodos());
      setIsShowInputConfirm(false);
      setIsShowAlertRemovedAll(true);
    } else if (isShowInputConfirm) {
      setIsFailConfirm(true);
    } else {
      setIsShowInputConfirm(true);
    }
  }

  function showSuccesRemoveAlert() {
    if (isShowAlertRemovedAll) {
      return (
        <View style={styles.successRemoved(dimentions.screen.width)}>
          <Text color='black' style={styles.successRemovedLabel}>
            Success delete.
          </Text>
        </View>
      );
    }
    return null;
  }

  function inputConfirmHandler() {
    if (isShowInputConfirm) {
      return (
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
          <Text
            style={[
              styles.errorText,
              { display: isFailConfirm ? 'flex' : 'none' },
            ]}
          >
            Fail confirm
          </Text>
        </View>
      );
    }
    return null;
  }

  return (
    <View style={{ marginVertical: 20 }}>
      <Text style={{ fontSize: 24, alignSelf: 'center', marginBottom: 10 }}>
        Remove all todos:
      </Text>
      <View style={styles.buttonRemoveAll}>
        <Button title='Remove' color='red' onPress={removeAllHandler} />
      </View>
      {showSuccesRemoveAlert()}
      {inputConfirmHandler()}
    </View>
  );
}

const styles = StyleSheet.create({
  inputConfirm: (widthScreen) => {
    const width = widthScreen - 60;
    return {
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
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
  errorText: {
    color: 'red',
    marginLeft: 20,
    bottom: 20,
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
  buttonRemoveAll: {
    borderColor: 'red',
    backgroundColor: '#c4c4c4',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
