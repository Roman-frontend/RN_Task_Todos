import React, { useState, useEffect, useMemo } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  Button,
  TextInput,
} from 'react-native';

export const DescriptionTodoModal = (route) => {
  return (
    <View style={{ margin: 60 }}>
      <Text style={{ fontSize: 24 }}>Hey am a modal screen!</Text>
      <Button
        title='Close this modal'
        onPress={() => {
          route.navigation.goBack(); //Дозволяє повернутися назад з попапу
        }}
      />
    </View>
  );
};
