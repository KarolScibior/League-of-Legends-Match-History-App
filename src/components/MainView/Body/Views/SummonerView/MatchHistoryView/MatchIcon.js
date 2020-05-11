import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';
import MatchModal from './MatchModal';

const MatchIcon = props => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const { index, championName, win, championsKDA, gameDuration, matchesData } = props;

  return (
    <>
      <MatchModal
        modalVisibility={modalVisibility}
        setModalVisibility={setModalVisibility}
        championName={championName}
        win={win}
        championsKDA={championsKDA}
        gameDuration={gameDuration}
        matchesData={matchesData}
      />
      <TouchableOpacity
        style={styles.championContainer}
        onPress={() => {
          setModalVisibility(!modalVisibility);
        }}
      >
        <View style={styles.championContainer}>
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
    </>
  )
};

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

export default MatchIcon;