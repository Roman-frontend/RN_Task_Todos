import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { ScreenNavigationProp } from '../../navigation/types';

interface Props {
  navigation: ScreenNavigationProp<'Todos'>;
  searchHandler: () => void;
}

type Style = {
  footer: ViewStyle;
  shadow: ViewStyle;
};

export function TodosFooter({ navigation, searchHandler }: Props) {
  const dimentions = useDimensions();

  return (
    <View
      style={[
        styles.footer,
        styles.shadow,
        { width: dimentions.screen.width - 40 },
      ]}
    >
      <TouchableOpacity
        style={{ alignSelf: 'center', right: 15 }}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      >
        <Feather name='settings' size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignSelf: 'center', left: 15 }}
        onPress={searchHandler}
      >
        <AntDesign name='search1' size={30} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  footer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 70,
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
});
