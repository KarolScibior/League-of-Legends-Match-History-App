import React from 'react';
import { StyleSheet, View } from 'react-native';
import theme from '../../utils/theme';
import Header from './Header/Header';
import Body from './Body/Body';

const MainView = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Body />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    marginTop: 24
  },
});


export default MainView;