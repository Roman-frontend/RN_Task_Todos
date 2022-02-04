import { StyleSheet, View, Button, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface Ptops {
  addTodoHandler: () => void;
}

type Style = {
  footerButtons: ViewStyle;
  buttonClose: ViewStyle;
  buttonAdd: ViewStyle;
};

export function AddTodoFooter({ addTodoHandler }: Ptops) {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 0.2 }}>
      <View style={styles.footerButtons}>
        <View style={styles.buttonAdd}>
          <Button title='Add to-do' color='blue' onPress={addTodoHandler} />
        </View>

        <View style={styles.buttonClose}>
          <Button
            title='Close'
            color='red'
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  footerButtons: {
    marginTop: 30,
    marginVertical: 20,
  },
  buttonClose: {
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonAdd: {
    borderColor: 'blue',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
