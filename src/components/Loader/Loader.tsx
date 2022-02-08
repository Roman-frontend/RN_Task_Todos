import { ActivityIndicator, View, StyleSheet, ViewStyle } from 'react-native';

type Style = {
  container: ViewStyle;
};

export const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size='large' color='#00d4cd' />
  </View>
);

const styles = StyleSheet.create<Style>({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
