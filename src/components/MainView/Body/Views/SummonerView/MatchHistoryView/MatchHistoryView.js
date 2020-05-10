import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import theme from '../../../../../../utils/theme';
import MatchIcons from './MatchIcons';
import Pagination from './Pagination';
import { actions } from '../../../../../../redux/ducks';

const MatchHistoryView = () => {
  const dispatch = useDispatch();
  const pullMatchHistory = async (accountId, beginIndex, endIndex) => await dispatch(actions.pullMatchHistory(accountId, beginIndex, endIndex));
  const pagination = useSelector(state => state.pagination);
  const summonerInfo = useSelector(state => state.summonerInfo);
  pullMatchHistory(summonerInfo.accountId, pagination.beginIndex, pagination.endIndex);

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