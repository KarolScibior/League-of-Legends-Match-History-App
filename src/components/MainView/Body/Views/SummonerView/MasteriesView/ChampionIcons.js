import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';

const ChampionIcons = () => {
  const championsInfo = useSelector(state => state.championsData);

  const renderChampion = () => {
    if (championsInfo.length !== 0) {
      return championsInfo.map((item, index) => {
        const championName = item[0];
        return (
          <Image
            style={styles.championIcon}
            key={index}
            source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${championName}.png`}}
          />
        )
      });
    }
  };

  return (
    <View style={styles.container}>
      {
        renderChampion()
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  championIcon: {
    height: 100,
    width: 100
  }
});

export default ChampionIcons;