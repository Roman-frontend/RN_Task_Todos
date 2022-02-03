import { useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDimensions } from '@react-native-community/hooks';

export const Input = ({
  checkedAll,
  setCheckedAll,
  checkedOnlyDone,
  setCheckedOnlyDone,
  checkedOnlyNotDone,
  setCheckedOnlyNotDone,
  value,
  setValue,
  isSearchFooter,
  setIsSearchFooter,
  inputRef,
  searchHandler,
}) => {
  const dimentions = useDimensions();

  useEffect(() => {
    if (!checkedAll && !checkedOnlyDone && !checkedOnlyNotDone) {
      setCheckedAll(true);
    }
  }, [checkedAll, checkedOnlyDone, checkedOnlyNotDone]);

  const searchSettingsHandler = (key) => {
    key === 'all' ? setCheckedAll(!checkedAll) : setCheckedAll(false);
    key === 'onlyDone'
      ? setCheckedOnlyDone(!checkedOnlyDone)
      : setCheckedOnlyDone(false);
    key === 'onlyNotDone'
      ? setCheckedOnlyNotDone(!checkedOnlyNotDone)
      : setCheckedOnlyNotDone(false);
  };

  function inputHandler(text) {
    setIsSearchFooter(false);
    setValue(text);
  }

  return (
    <View>
      <TouchableOpacity onPress={searchHandler}>
        <View style={styles.block(dimentions.screen.width, isSearchFooter)}>
          <EvilIcons name='search' size={30} />
          <TextInput
            style={styles.input}
            onChangeText={(text) => inputHandler(text)}
            ref={inputRef}
            value={value}
            placeholder='   Search'
            onFocus={() => setIsSearchFooter(true)}
            onEndEditing={() => setIsSearchFooter(false)}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>
      </TouchableOpacity>
      <View style={styles.searchTab(dimentions.screen.width, isSearchFooter)}>
        <BouncyCheckbox
          size={25}
          fillColor='black'
          unfillColor='#FFFFFF'
          text='Всі'
          isChecked={checkedAll}
          disableBuiltInState
          style={styles.checkBox}
          textStyle={{ textDecorationLine: 'none' }}
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
          textStyle={{ textDecorationLine: 'none' }}
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
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => searchSettingsHandler('onlyNotDone')}
        />
      </View>
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
  searchTab: (widthScreen, isSearchFooter) => {
    const width = widthScreen - 40;
    const display = isSearchFooter ? 'flex' : 'none';
    return {
      display,
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      paddingHorizontal: 10,
      height: 130,
      width,
      left: 20,
      right: 20,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
    };
  },
  checkBox: { marginLeft: 15 },
});
