import { StyleSheet, View, TouchableOpacity, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useDimensions } from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ScreenNavigationProp } from '../../navigation/types';

type Style = {
  viewButton: ViewStyle;
  plusButton: ViewStyle;
  shadow: ViewStyle;
};

export function TodosFooterPlus() {
  const dimentions = useDimensions();
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();

  return (
    <TouchableOpacity
      style={[
        styles.plusButton,
        styles.shadow,
        { left: dimentions.screen.width / 2 - 40 },
      ]}
    >
      <View style={styles.viewButton}>
        <AntDesign
          name='plus'
          size={40}
          color='#ffffff'
          onPress={() => {
            navigation.navigate('AddTodo');
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create<Style>({
  viewButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e32f45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
