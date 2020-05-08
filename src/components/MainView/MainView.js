import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';
import Header from './Header/Header';

const MainView = () => {

  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    marginTop: 24
  },
});


export default MainView;