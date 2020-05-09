import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const RankedView = () => {
  const rankedInfo = useSelector(state => state.rankedInfo);

  const renderDivision = () => {
    if (rankedInfo !== undefined) {
      return (
        <>
          <BoldText style={styles.title} text={`${rankedInfo.tier} ${rankedInfo.rank}`} />
          <BoldText style={styles.winRatio} text={`W: ${rankedInfo.wins} L: ${rankedInfo.losses}`} />
        </>
      );
    } else {
      return (
        <BoldText style={styles.title} text='UNRANKED' />
      )
    }
  }

  return (
    <View style={styles.mainContainer}>
      {
        renderDivision()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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

export default RankedView;