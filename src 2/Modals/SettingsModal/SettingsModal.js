import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export const SettingsModal = (route) => {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>To-do list settings</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text>Remove all todos</Text>
        <Button
          title='Remove'
          onPress={() => {
            route.navigation.goBack();
          }}
        />
      </View>
      <Button
        title='Close this modal'
        onPress={() => {
          route.navigation.goBack();
        }}
      />
    </View>
  );
};
