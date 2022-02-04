import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import { ScreenRouteProp, ScreenNavigationProp } from '../../navigation/types';

export function SettingsFooter() {
  const { params } = useRoute<ScreenRouteProp<'Settings'>>();
  const isShowRemoveTodo: boolean = params?.isShowRemoveTodo
    ? params?.isShowRemoveTodo
    : false;
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();

  return (
    <View style={{ flex: 0.5, justifyContent: 'flex-end', marginBottom: 30 }}>
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
    marginVertical: 5,
    marginHorizontal: 60,
  },
});
