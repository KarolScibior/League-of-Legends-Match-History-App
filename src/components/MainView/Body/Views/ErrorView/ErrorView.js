import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BoldText from '../../../../CustomText/BoldText';
import theme from '../../../../../utils/theme';

const ErrorView = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.errorImage}
        source={{
          uri: 'https://how2play.pl/wp-content/uploads/2017/09/ahri2-1.jpg'
        }}
      />
      <BoldText style={styles.title} text='Summoner not found!' />
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
  errorImage: {
    width: 200,
    height: 200,
    marginBottom: 8
  }
});

export default ErrorView;