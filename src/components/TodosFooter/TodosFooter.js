import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

export function TodosFooter({ navigation, searchHandler }) {
  const dimentions = useDimensions();

  return (
    <View style={[styles.footer(dimentions.screen.width), styles.shadow]}>
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

const styles = StyleSheet.create({
  footer: (widthScreen) => {
    const width = widthScreen - 40;
    console.log(width, widthScreen);
    return {
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
      width,
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
