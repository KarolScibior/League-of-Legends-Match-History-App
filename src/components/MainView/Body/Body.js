import React, { useState } from 'react';
import { StyleSheet, View, Image, ToastAndroid } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BoldText from '../../CustomText/BoldText';
import theme from '../../../utils/theme';
import { actions } from '../../../redux/ducks';

const Body = () => {
  const dispatch = useDispatch();
  const resetError = () => dispatch(actions.setError(''));

  const summonerInfo = useSelector(state => state.summonerInfo);
  const error = useSelector(state => state.errorMessage);
  const isLoading = useSelector(state => state.isLoading);
  const view = useSelector(state => state.view);

  const renderProfile = () => {
    switch (view) {
      case 'regular':
        return (
          <View style={styles.container}>
          <Image
            style={styles.loading}
            source={{
              uri: 'https://how2play.pl/wp-content/uploads/2017/09/ahri-1.jpg'
            }}
          />
          <BoldText style={styles.title} text='Nothing to see yet...' />
        </View>
        );

      case 'error':
        return (
          <View style={styles.container}>
          <Image
            style={styles.loading}
            source={{
              uri: 'https://how2play.pl/wp-content/uploads/2017/09/ahri2-1.jpg'
            }}
          />
          <BoldText style={styles.title} text='Summoner not found!' />
        </View>
        );

      case 'loading':
        return (
          <View style={styles.container}>
            <Image
              style={styles.loading}
              source={{
                uri: 'https://media3.giphy.com/media/l2Sq70sCn6RnYHCeY/giphy.gif?cid=ecf05e4738c44f82282941791bd8909e5f453b9ab64adbac&rid=giphy.gif'
              }}
            />
            <BoldText style={styles.title} text='Searching..' />
          </View>
        )

      case 'summoner':
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
        )
    }
  };

  return (
    <View style={styles.container}>
      {
        renderProfile()
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileIcon: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  title: {
    color: theme.colors.primaryText,
    fontSize: 24,
    marginTop: 8
  },
  loading: {
    width: 200,
    height: 200,
    marginBottom: 8
  },
  level: {
    color: theme.colors.secondaryText,
    fontSize: 16
  }
});

export default Body;