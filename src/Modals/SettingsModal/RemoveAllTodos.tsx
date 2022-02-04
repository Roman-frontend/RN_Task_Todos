import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import Entypo from 'react-native-vector-icons/Entypo';
import { todosSlice } from '../../Redux/reducers/todosReducer';
import { useAppDispatch } from '../../hooks/redux';

type Style = {
  inputConfirm: ViewStyle;
  inputLabel: TextStyle;
  inputFieldConfirm: ViewStyle;
  errorText: TextStyle;
  successRemoved: ViewStyle;
  successRemovedLabel: TextStyle;
  buttonRemoveAll: ViewStyle;
};

const CONFIRM_REMOVE_TEXT: string = 'Remove all todos';

export function SettingsRemoveAllTodos() {
  const { removeAllTodos } = todosSlice.actions;
  const dispatch = useAppDispatch();
  const dimentions = useDimensions();
  const [inputValue, setInputValue] = useState<string>('');
  const [isShowInputConfirm, setIsShowInputConfirm] = useState<boolean>(false);
  const [isFailConfirm, setIsFailConfirm] = useState<boolean>(false);
  const [isShowAlertRemovedAll, setIsShowAlertRemovedAll] =
    useState<boolean>(false);

  useEffect(() => {
    if (isShowAlertRemovedAll) {
      setTimeout(() => {
        setIsShowAlertRemovedAll(false);
      }, 2000);
    }
  }, [isShowAlertRemovedAll]);

  function removeAllHandler(): void {
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

  function showSuccesRemoveAlert(): JSX.Element | null {
    if (isShowAlertRemovedAll) {
      return (
        <View
          style={[
            styles.successRemoved,
            { width: dimentions.screen.width - 60 },
          ]}
        >
          <Text style={styles.successRemovedLabel}>Success delete.</Text>
        </View>
      );
    }
    return null;
  }

  function inputConfirmHandler(): JSX.Element | null {
    if (isShowInputConfirm) {
      return (
        <View
          style={[styles.inputConfirm, { width: dimentions.screen.width - 60 }]}
        >
          <Text style={styles.inputLabel}>
            Please type: "{CONFIRM_REMOVE_TEXT}" - to confirm.
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <TextInput
              placeholder={`  ${CONFIRM_REMOVE_TEXT}`}
              value={inputValue}
              style={[
                styles.inputFieldConfirm,
                { width: dimentions.screen.width - 140 },
              ]}
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

const styles = StyleSheet.create<Style>({
  inputConfirm: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    height: 140,
    left: 10,
    right: 20,
    bottom: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  inputLabel: {
    color: 'black',
    marginLeft: 10,
    fontSize: 18,
  },
  inputFieldConfirm: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'blue',
    fontSize: 20,
  },
  errorText: {
    color: 'red',
    marginLeft: 20,
    bottom: 20,
  },
  successRemoved: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    height: 50,
    bottom: 10,
    left: 10,
    right: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  successRemovedLabel: {
    color: 'black',
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
