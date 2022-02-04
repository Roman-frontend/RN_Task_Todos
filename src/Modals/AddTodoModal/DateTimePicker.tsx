import React, { useState } from 'react';
import { StyleSheet, View, Button, ViewStyle } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type Style = {
  dateBlock: ViewStyle;
};

export function AddTodoDateTimePicker({ setDate, setTime }) {
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState<boolean>(false);

  const handleDateConfirm = (date: Date) => {
    const fullYears: number | string = date.getFullYear();
    const month: number | string =
      date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day: number | string =
      date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;

    const readyDate: string = `${fullYears}.${month}.${day}`;
    setDate(readyDate);
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time: Date): void => {
    const hour: number | string = time.getHours();
    const minute: number | string =
      time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
    const second: number | string =
      time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
    const readyTime: string = `${hour}:${minute}:${second}`;
    setTime(readyTime);
    setIsTimePickerVisible(false);
  };

  return (
    <View>
      <View style={styles.dateBlock}>
        <Button
          title='Show Date Picker'
          onPress={() => setDatePickerVisibility(true)}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode='date'
          onConfirm={handleDateConfirm}
          onCancel={() => setDatePickerVisibility(false)}
        />
      </View>

      <View style={styles.dateBlock}>
        <Button
          title='Show Time Picker'
          onPress={() => setIsTimePickerVisible(true)}
        />
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode='time'
          onConfirm={handleTimeConfirm}
          onCancel={() => setIsTimePickerVisible(false)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create<Style>({
  dateBlock: {
    marginVertical: 10,
  },
});
