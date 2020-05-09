import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const ChampionIcons = ({ masteryPoints }) => {
  const championsInfo = useSelector(state => state.championsData);

  const renderChampion = () => {
    if (championsInfo.length !== 0 && masteryPoints !== undefined) {
      return championsInfo.map((item, index) => {
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
              <BoldText style={styles.masteryLevel} text={`Mastery level: ${masteryPoints[index].championLevel}`}/>
              <BoldText style={styles.masteryPoints} text={`Mastery points: ${masteryPoints[index].championPoints}`} />
            </View>
          </View>
        )
      });
    } else {
      return (
        <BoldText style={styles.secondaryText} text='No champions to display...' />
      )
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
  },
  masteryLevel: {
    color: theme.colors.primary,
    fontSize: 16
  },
  masteryPoints: {
    color: theme.colors.primary
  }
});

export default ChampionIcons;