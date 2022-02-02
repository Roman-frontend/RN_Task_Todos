import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Alert,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import { connect, useSelector, useDispatch } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDimensions } from '@react-native-community/hooks';
import { addTodo } from '../../Redux/toolkitReducer';

export const Input = ({
  isSearchFocus,
  setIsSearchFocus,
  inputRef,
  searchHandler,
}) => {
  const dispatch = useDispatch();
  const dimentions = useDimensions();
  const [value, setValue] = useState('');
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedOnlyDone, setCheckedOnlyDone] = useState(false);
  const [checkedOnlyNotDone, setCheckedOnlyNotDone] = useState(false);

  const searchSettingsHandler = (key) => {
    key === 'all' ? setCheckedAll(!checkedAll) : setCheckedAll(false);
    key === 'onlyDone'
      ? setCheckedOnlyDone(!checkedOnlyDone)
      : setCheckedOnlyDone(false);
    key === 'onlyNotDone'
      ? setCheckedOnlyNotDone(!checkedOnlyNotDone)
      : setCheckedOnlyNotDone(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={searchHandler}>
        <View style={styles.block(dimentions.screen.width, isSearchFocus)}>
          <EvilIcons name='search' size={30} />
          <TextInput
            style={styles.input}
            onChangeText={setValue}
            ref={inputRef}
            value={value}
            placeholder='   Search'
            onFocus={() => setIsSearchFocus(true)}
            onEndEditing={() => setIsSearchFocus(false)}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
      </TouchableOpacity>
      {isSearchFocus && (
        <View
          style={[styles.searchTab(dimentions.screen.width), styles.shadow]}
        >
          <BouncyCheckbox
            size={25}
            fillColor='black'
            unfillColor='#FFFFFF'
            text='Всі'
            isChecked={checkedAll}
            disableBuiltInState
            style={styles.checkBox}
            iconStyle={{ borderColor: 'blue' }}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={() => searchSettingsHandler('all')}
          />
          <BouncyCheckbox
            size={25}
            fillColor='black'
            unfillColor='#FFFFFF'
            text='Тільки виконані'
            isChecked={checkedOnlyDone}
            disableBuiltInState
            style={styles.checkBox}
            iconStyle={{ borderColor: 'blue' }}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={() => searchSettingsHandler('onlyDone')}
          />
          <BouncyCheckbox
            size={25}
            fillColor='black'
            unfillColor='#FFFFFF'
            text='Тільки не виконані'
            isChecked={checkedOnlyNotDone}
            disableBuiltInState
            style={styles.checkBox}
            iconStyle={{ borderColor: 'blue' }}
            textStyle={{
              textDecorationLine: 'none',
            }}
            onPress={() => searchSettingsHandler('onlyNotDone')}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  block: (widthScreen, isOpenSearch) => {
    const width = widthScreen - 40;
    return {
      flexDirection: 'row',
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      alignItems: 'center',
      marginTop: 40,
      paddingHorizontal: 10,
      alignContent: 'flex-end',
      height: 50,
      width,
      left: 20,
      right: 20,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      borderBottomLeftRadius: isOpenSearch ? 0 : 15,
      borderBottomRightRadius: isOpenSearch ? 0 : 15,
    };
  },
  input: {
    width: '80%',
    height: 35,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
  button: {
    marginRight: 10,
  },
  searchTab: (widthScreen) => {
    const width = widthScreen - 40;
    return {
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      alignItems: 'left',
      paddingHorizontal: 10,
      height: 130,
      width,
      left: 20,
      right: 20,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
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
});
