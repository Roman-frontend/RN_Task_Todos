import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { RootStackParams } from '../../navigation/types';

type ScreenNavigationProp<T extends keyof RootStackParams> =
  StackNavigationProp<RootStackParams, T>;

type ScreenRouteProp<T extends keyof RootStackParams> = RouteProp<
  RootStackParams,
  T
>;
type Props<T extends keyof RootStackParams> = {
  route: ScreenRouteProp<T>;
};

export function SettingsFooter({ route }: Props<'Settings'>) {
  const { isShowRemoveTodo } = route.params;
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();

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
    marginVertical: 5,
    marginHorizontal: 60,
  },
});
