import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const MasteriesView = () => {
  const masteryInfo = useSelector(state => state.championsMastery);
  const championsInfo = useSelector(state => state.championsData);

  //console.log(masteryInfo);

  //console.log(championsInfo);

  const renderChampion = () => {
    return masteryInfo.map((item, index) => {
      //console.log(item.championId);
      return (
        <Image
          style={styles.championIcon}
          key={index}
          source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${championsInfo[0][0]}.png`}}
        />
      )
    })
  }

  return (
    <View style={styles.container}>
      <BoldText style={styles.title} text='Top 3 Champions' />
      <View style={styles.container}>
        {
          //renderChampion()
        }
      </View>
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
    fontSize: 20
  },
  championIcon: {
    height: 100,
    width: 100
  }
});

export default MasteriesView;