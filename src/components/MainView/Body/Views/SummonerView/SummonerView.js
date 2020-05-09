import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { LEAGUE_PATCH } from 'react-native-dotenv';
import BoldText from '../../../../CustomText/BoldText';
import theme from '../../../../../utils/theme';
import RankedView from './RankedView/RankedView';
import MasteriesView from './MasteriesView/MasteriesView';
import MatchHistoryView from './MatchHistoryView/MatchHistoryView';

const RegularView = () => {
  const summonerInfo = useSelector(state => state.summonerInfo);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileIcon}
        source={{
          uri: `http://ddragon.leagueoflegends.com/cdn/${LEAGUE_PATCH}/img/profileicon/${summonerInfo.profileIconId}.png`
        }}
      />
      <BoldText style={styles.title} text={summonerInfo.name} />
      <BoldText style={styles.level} text={`Level ${summonerInfo.summonerLevel}`} />
      <RankedView />
      <MasteriesView />
      <MatchHistoryView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: theme.colors.primaryText,
    fontSize: 24,
    marginTop: 8
  },
  level: {
    color: theme.colors.secondaryText,
    fontSize: 20
  },
  profileIcon: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
});

export default RegularView;