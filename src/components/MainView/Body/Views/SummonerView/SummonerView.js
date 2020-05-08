import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../CustomText/BoldText';
import theme from '../../../../../utils/theme';

const RegularView = () => {
  const summonerInfo = useSelector(state => state.summonerInfo);

  return (
    <View style={styles.container}>
      <Image
        style={styles.profileIcon}
        source={{
          uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/profileicon/${summonerInfo.profileIconId}.png`
        }}
      />
      <BoldText style={styles.title} text={summonerInfo.name} />
      <BoldText text={`Level ${summonerInfo.summonerLevel}`} />
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
  profileIcon: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
});

export default RegularView;