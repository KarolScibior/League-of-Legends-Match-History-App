import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BoldText from '../../../../CustomText/BoldText';
import theme from '../../../../../utils/theme';

const RegularView = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.landingImage}
        source={{
          uri: 'https://how2play.pl/wp-content/uploads/2017/09/ahri-1.jpg'
        }}
      />
      <BoldText style={styles.title} text='Nothing to see yet...' />
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
  landingImage: {
    width: 200,
    height: 200,
    marginBottom: 8
  }
});

export default RegularView;