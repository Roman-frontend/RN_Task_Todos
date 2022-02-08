import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Button, ViewStyle } from 'react-native';
import { ScreenRouteProp, ScreenNavigationProp } from '../../navigation/types';

type Style = {
  container: ViewStyle;
  footerButton: ViewStyle;
  applyView: ViewStyle;
  closeView: ViewStyle;
};

export function SettingsFooter() {
  const { params } = useRoute<ScreenRouteProp<'Settings'>>();
  const isShowRemoveTodo: boolean = params?.isShowRemoveTodo
    ? params?.isShowRemoveTodo
    : false;
  const navigation = useNavigation<ScreenNavigationProp<'Todos'>>();

  return (
    <View style={styles.container}>
      <View style={[styles.footerButton, styles.applyView]}>
        <Button
          title='Apply settings'
          onPress={() => {
            navigation.navigate('Todos', { isShowRemoveTodo });
          }}
        />
      </View>
      <View style={[styles.footerButton, styles.closeView]}>
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

const styles = StyleSheet.create<Style>({
  container: { flex: 0.5, justifyContent: 'flex-end', marginBottom: 30 },
  footerButton: {
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 5,
    marginHorizontal: 60,
  },
  applyView: { borderColor: 'blue' },
  closeView: { borderColor: 'red' },
});
