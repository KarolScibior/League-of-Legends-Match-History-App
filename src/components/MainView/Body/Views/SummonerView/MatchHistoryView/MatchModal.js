import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';

const MatchModal = props => {
  const { index, modalVisibility, setModalVisibility, championName, win, championsKDA, gameDuration, matchesData } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisibility}
    >
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.xContainer}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibility(!modalVisibility);
                }}
              >
                <Text style={styles.closingButton}>×</Text>
              </TouchableOpacity>
            </View>
            <BoldText style={win === 'VICTORY' ? styles.win : styles.defeat} text={win} />
            <View style={{ flexDirection: 'row' }}>
              <Image
                style={styles.championIcon}
                source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/champion/${championName}.png`}}
              />
              <View>
                <Image
                  style={styles.summonerSpell}
                  source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/spell/SummonerFlash.png`}}
                />
                <Image
                  style={styles.summonerSpell}
                  source={{ uri: `http://ddragon.leagueoflegends.com/cdn/10.9.1/img/spell/SummonerFlash.png`}}
                />
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <BoldText style={styles.championTitle} text={matchesData[index].gameMode} />
                <BoldText style={styles.kda} text={`KDA: ${championsKDA[index].k}/${championsKDA[index].d}/${championsKDA[index].a}, CS: ${championsKDA[index].cs}`} />
                <BoldText style={styles.championName} text={gameDuration} />
              </View>
            </View>
          </View>
        </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '92%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  xContainer: {
    alignItems: 'flex-end',
    width: '100%'
  },
  closingButton: {
    fontSize: 24,
    textAlign: 'right'
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  win: {
    color: theme.colors.accent,
    fontSize: 20
  },
  defeat: {
    color: 'red',
    fontSize: 20
  },
  championIcon: {
    height: 64,
    width: 64,
    margin: 4
  },
  kda: {
    color: theme.colors.primaryText,
    fontSize: 16
  },
  championTitle: {
    color: theme.colors.secondaryText,
    fontSize: 12
  },
  championName: {
    color: theme.colors.primaryText,
    fontSize: 12
  },
  summonerSpell: {
    height: 30,
    width: 30,
    marginRight: 24,
    marginTop: 4
  }
});

export default MatchModal;
