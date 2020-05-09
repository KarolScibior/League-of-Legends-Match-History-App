import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';
import ChampionIcons from './ChampionIcons';

const MasteriesView = () => {
  const masteryInfo = useSelector(state => state.championsMastery);

  const getMasteryPoints = () => {
    if (masteryInfo !== undefined) {
      return masteryInfo.map(item => {
        return {
          championLevel: item.championLevel,
          championPoints: item.championPoints
        };
      });
    } else {
      return undefined;
    }
  }

  const masteryPoints = getMasteryPoints();

  return (
    <View style={styles.mainContainer}>
      <BoldText style={styles.title} text='Top 3 Champions' />
      <ChampionIcons masteryPoints={masteryPoints} />
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

export default MasteriesView;