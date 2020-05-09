import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';
import MatchIcons from './MatchIcons';
import Pagination from './Pagination';

const MatchHistoryView = () => {

  return (
    <View style={styles.mainContainer}>
      <MatchIcons />
      <Pagination />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: theme.colors.primaryText,
    fontSize: 20
  }
});

export default MatchHistoryView;