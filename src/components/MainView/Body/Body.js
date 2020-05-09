import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ErrorView from './Views/ErrorView/ErrorView';
import RegularView from './Views/RegularView/RegularView';
import LoadingView from './Views/LoadingView/LoadingView';
import SummonerView from './Views/SummonerView/SummonerView';

const Body = () => {
  const view = useSelector(state => state.view);

  const renderProfile = () => {
    switch (view) {
      case 'regular':
        return (
          <RegularView />
        );

      case 'error':
        return (
          <ErrorView />
        );

      case 'loading':
        return (
          <LoadingView />
        )

      case 'summoner':
        return (
          <SummonerView />
        )
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        renderProfile()
      }
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  }
});

export default Body;