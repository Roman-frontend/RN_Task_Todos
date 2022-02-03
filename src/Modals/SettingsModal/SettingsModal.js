import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDimensions } from '@react-native-community/hooks';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { SettingsFooter } from '../../components/SettingsFooter/SettingsFooter';
import { SettingsRemoveAllTodos } from '../../components/SettingsRemoveAllTodos/SettingsRemoveAllTodos';

export const SettingsModal = ({ navigation, route }) => {
  const { isShowRemoveTodo } = route.params;
  const dimentions = useDimensions();
  const [isCheckedShowRemoveButton, setIsCheckedShowRemoveButton] =
    useState(isShowRemoveTodo);

  function showRemoveButtonTodoHandler() {
    isCheckedShowRemoveButton
      ? hideRemoveButtonHandler()
      : showRemoveButtonHandler();
  }

  function showRemoveButtonHandler() {
    setIsCheckedShowRemoveButton(true);
    navigation.setParams({ isShowRemoveTodo: true });
  }

  function hideRemoveButtonHandler() {
    setIsCheckedShowRemoveButton(false);
    navigation.setParams({ isShowRemoveTodo: false });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ flex: 0.6 }}>
          <Text style={styles.title}>To-do list settings</Text>
          <View style={[styles.checkShowRemove(dimentions.screen.width)]}>
            <BouncyCheckbox
              size={30}
              fillColor='black'
              unfillColor='#FFFFFF'
              text='Show remove button'
              isChecked={isCheckedShowRemoveButton}
              disableBuiltInState
              style={styles.checkBox}
              textStyle={{ textDecorationLine: 'none', fontSize: 20 }}
              onPress={showRemoveButtonTodoHandler}
            />
          </View>

          <SettingsRemoveAllTodos />
        </View>
      </ScrollView>

      <SettingsFooter navigation={navigation} route={route} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 60, marginHorizontal: 20, flex: 1 },
  title: { fontSize: 24, marginBottom: 30, alignSelf: 'center' },
  checkShowRemove: (widthScreen) => {
    const width = widthScreen - 80;
    return {
      backgroundColor: '#ffffff',
      justifyContent: 'space-around',
      marginVertical: 20,
      height: 50,
      width,
      left: 20,
      right: 20,
    };
  },
  checkBox: { marginLeft: 15 },
});
