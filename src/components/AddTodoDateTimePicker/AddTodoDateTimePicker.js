import React, { useState } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export function AddTodoDateTimePicker({ setDate, setTime }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setIsTimePickerVisible] = useState(false);

  const handleDateConfirm = (date) => {
    const fullYears = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;

    const readyDate = `${fullYears}.${month}.${day}`;
    setDate(readyDate);
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    const hour = time.getHours();
    const minute =
      time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
    const second =
      time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
    const readyTime = `${hour}:${minute}:${second}`;
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

const styles = StyleSheet.create({
  dateBlock: {
    marginVertical: 10,
  },
});
