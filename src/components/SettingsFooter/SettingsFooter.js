import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

export function SettingsFooter({ navigation, route }) {
  const { isShowRemoveTodo } = route.params;

  return (
    <View style={{ flex: 0.4, justifyContent: 'flex-end' }}>
      <View style={[styles.footerButton, { borderColor: 'blue' }]}>
        <Button
          title='Apply settings'
          onPress={() => {
            navigation.navigate('Todos', { isShowRemoveTodo });
          }}
        />
      </View>
      <View style={[styles.footerButton, { borderColor: 'red' }]}>
        <Button
          title='Close settings'
          color='red'
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    marginHorizontal: 50,
  },
});
