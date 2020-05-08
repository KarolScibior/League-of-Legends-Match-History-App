import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BoldText from '../../CustomText/BoldText';
import theme from '../../../utils/theme';
import { actions } from '../../../redux/ducks';

const Header = () => {
  const [inputValue, setInputValue] = useState('');

  const dispatch = useDispatch();
  const pullSummonerInfo = summonerName => dispatch(actions.pullSummonerInfo(summonerName));

  return (
    <View style={styles.container}>
      <BoldText style={styles.title} text='League of Legends Match History App' />
      <View style={styles.searchBarContainer}>
        <Icon
          name='search'
          size={32}
          color={theme.colors.text}
        />
        <TextInput
          style={styles.searchBar}
          placeholder='Enter summoner name...'
          value={inputValue}
          onChangeText={text => setInputValue(text)}
          onSubmitEditing={() => {
            pullSummonerInfo(inputValue);
            setInputValue('');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.darkPrimary,
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    color: theme.colors.text,
    fontSize: 16
  },
  searchBarContainer: {
    width: '100%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    backgroundColor: theme.colors.text,
    borderRadius: 16,
    paddingLeft: 8,
    width: '80%',
    height: 40,
    fontFamily: theme.font.regular,
    color: theme.colors.primaryText,
    marginBottom: 4,
    marginRight: 8
  }
});

export default Header;