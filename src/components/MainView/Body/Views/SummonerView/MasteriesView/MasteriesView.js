import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';
import ChampionIcons from './ChampionIcons';

const MasteriesView = () => {
  const masteryInfo = useSelector(state => state.championsMastery);

  return (
    <View style={styles.mainContainer}>
      <BoldText style={styles.title} text='Top 3 Champions' />
      <ChampionIcons />
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