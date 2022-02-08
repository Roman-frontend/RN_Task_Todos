import { useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { useDimensions } from '@react-native-community/hooks';

interface Props {
  checkedAll: boolean;
  setCheckedAll: React.Dispatch<React.SetStateAction<boolean>>;
  checkedOnlyDone: boolean;
  setCheckedOnlyDone: React.Dispatch<React.SetStateAction<boolean>>;
  checkedOnlyNotDone: boolean;
  setCheckedOnlyNotDone: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isSearchFooter: boolean;
  setIsSearchFooter: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: any;
  searchHandler: () => void;
}

type Style = {
  block: ViewStyle;
  input: ViewStyle;
  searchTab: ViewStyle;
  checkBox: ViewStyle;
};

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
}: Props) => {
  const dimentions = useDimensions();

  useEffect(() => {
    if (!checkedAll && !checkedOnlyDone && !checkedOnlyNotDone) {
      setCheckedAll(true);
    }
  }, [checkedAll, checkedOnlyDone, checkedOnlyNotDone]);

  const searchSettingsHandler = (key: string): void => {
    key === 'all' ? setCheckedAll(!checkedAll) : setCheckedAll(false);
    key === 'onlyDone'
      ? setCheckedOnlyDone(!checkedOnlyDone)
      : setCheckedOnlyDone(false);
    key === 'onlyNotDone'
      ? setCheckedOnlyNotDone(!checkedOnlyNotDone)
      : setCheckedOnlyNotDone(false);
    setIsSearchFooter(false);
  };

  function inputHandler(text: string): void {
    setIsSearchFooter(false);
    setValue(text);
  }

  return (
    <View>
      <TouchableOpacity onPress={searchHandler}>
        <View
          style={[
            styles.block,
            {
              width: dimentions.screen.width - 40,
              borderBottomLeftRadius: isSearchFooter ? 0 : 15,
              borderBottomRightRadius: isSearchFooter ? 0 : 15,
            },
          ]}
        >
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
      <View
        style={[
          styles.searchTab,
          {
            width: dimentions.screen.width - 40,
            display: isSearchFooter ? 'flex' : 'none',
          },
        ]}
      >
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

const styles = StyleSheet.create<Style>({
  block: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 40,
    paddingHorizontal: 10,
    alignContent: 'flex-end',
    height: 50,
    left: 20,
    right: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    width: '80%',
    height: 35,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
  searchTab: {
    backgroundColor: '#ffffff',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    height: 130,
    left: 20,
    right: 20,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  checkBox: { marginLeft: 15 },
});
