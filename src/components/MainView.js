import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const MainView = () => {
  return (
    <View style={styles.container}>
      <Text>This will be my league of legends match history app</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default MainView;