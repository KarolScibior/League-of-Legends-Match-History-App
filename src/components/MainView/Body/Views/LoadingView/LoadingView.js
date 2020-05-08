import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BoldText from '../../../../CustomText/BoldText';
import theme from '../../../../../utils/theme';

const LoadingView = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.loadingImage}
        source={{
          uri: 'https://media3.giphy.com/media/l2Sq70sCn6RnYHCeY/giphy.gif?cid=ecf05e4738c44f82282941791bd8909e5f453b9ab64adbac&rid=giphy.gif'
        }}
      />
      <BoldText style={styles.title} text='Searching..' />
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
    fontSize: 24,
    marginTop: 8
  },
  loadingImage: {
    width: 200,
    height: 200,
    marginBottom: 8
  }
});

export default LoadingView;