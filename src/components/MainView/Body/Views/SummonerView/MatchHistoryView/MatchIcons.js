import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import AnimatedEllipsis from 'react-native-animated-ellipsis';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const MatchIcons = () => {
  const matches = useSelector(state => state.matches);
  const matchesChampions = useSelector(state => state.matchesChampionsData);
  const matchesData = useSelector(state => state.matchesData);

  const extractChampionData = () => {
    let championsKDA = [];
    matchesData.forEach((item, index) => {
      if (matchesChampions.length === 5) {
        const championName = matchesChampions[index][0];
        let championData = Object.entries(matchesChampions[index][1]);
        let championId = Number(championData[2][1]);
        item.participants.forEach(item => {
          if (championId === Number(item.championId)) {
            championsKDA.push({
              championName,
              k: item.stats.kills,
              d: item.stats.deaths,
              a: item.stats.assists,
              win: item.stats.win,
              cs: item.stats.totalMinionsKilled
            })
          }
        })
      }
    })
    return championsKDA;
  }

  const renderMatches = () => {
    if (matchesChampions.length === 5 && matchesData.length === 5) {
      const championsKDA = extractChampionData();
      return matchesChampions.map((item, index) => {
        const championName = item[0];
        const championTitle = Object.entries(item[1])[4][1];
        let win = '';
        if (championsKDA[index].win === true) {
          win = 'VICTORY'
        } else {
          win = 'DEFEAT';
        }

        const gameDuration = `${Math.ceil(Number(matchesData[index].gameDuration) / 60)}:${Number(matchesData[index].gameDuration) % 60}`;

        return (
          <TouchableOpacity key={index} style={styles.championContainer}>
            <View key={index} style={styles.championContainer}>
              <Image
                style={styles.championIcon}
                key={index}
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${championName}.png`}}
              />
              <View style={styles.container}>
                <BoldText style={win === 'VICTORY' ? styles.win : styles.defeat} text={win} />
                <BoldText style={styles.championTitle} text={matchesData[index].gameMode} />
                <BoldText style={styles.kda} text={`KDA: ${championsKDA[index].k}/${championsKDA[index].d}/${championsKDA[index].a}, CS: ${championsKDA[index].cs}`} />
                <BoldText style={styles.championName} text={gameDuration} />
              </View>
            </View>
          </TouchableOpacity>
        )
      });
    } else {
      return (
        <>
          <BoldText style={styles.secondaryText} text='Loading' />
          <AnimatedEllipsis style={{...styles.secondaryText, fontFamily: 'montserratBold'}} aimationDelay={100} />
        </>
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
  kda: {
    color: theme.colors.primaryText,
    fontSize: 16
  },
  championTitle: {
    color: theme.colors.secondaryText,
    fontSize: 8
  },
  championName: {
    color: theme.colors.primaryText,
    fontSize: 12
  },
  win: {
    color: theme.colors.accent,
    fontSize: 20
  },
  defeat: {
    color: 'red',
    fontSize: 20
  }
});

export default MatchIcons;