import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const MatchIcons = () => {
  const matches = useSelector(state => state.matches);
  const matchesChampions = useSelector(state => state.matchesChampionsData);

  //console.log(matches);

  const renderMatches = () => {
    if (matchesChampions.length !== 0 ) {
      return matchesChampions.map((item, index) => {
        const championName = item[0];
        const championTitle = Object.entries(item[1])[4][1];
        return (
          <View key={index} style={styles.championContainer}>
            <Image
              style={styles.championIcon}
              key={index}
              source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${championName}.png`}}
            />
            <View style={styles.container}>
              <BoldText style={styles.championName} text={championName}/>
              <BoldText style={styles.championTitle} text={championTitle} />
            </View>
          </View>
        )
      });
    } else {
      return (
        <BoldText style={styles.secondaryText} text='Loading...' />
      )
    }
  };

  return (
    <View style={styles.container}>
      {
        renderMatches()
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
    flexDirection: 'column'
  },
  championContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  championIcon: {
    height: 100,
    width: 100,
    margin: 4
  },
  secondaryText: {
    color: theme.colors.secondaryText,
    fontSize: 20
  },
  championName: {
    color: theme.colors.primaryText,
    fontSize: 20
  },
  championTitle: {
    color: theme.colors.secondaryText,
    fontSize: 12
  }
});

export default MatchIcons;