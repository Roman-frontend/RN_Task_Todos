import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function TodosFooterPlus({ navigation }) {
  const dimentions = useDimensions();

  return (
    <TouchableOpacity
      style={[styles.plusButton(dimentions.screen.width), styles.shadow]}
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

const styles = StyleSheet.create({
  viewButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e32f45',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: (widthScreen) => {
    const rightButton = widthScreen / 2 - 40;
    return {
      position: 'absolute',
      bottom: 50,
      left: rightButton,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1,
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
});
