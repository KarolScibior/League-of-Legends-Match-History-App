import React from 'react';
import { Text } from 'react-native';

const RegularText = (props) => {
  const { text, style } = props;

  return (
    <Text style={{...style, fontFamily: 'montserrat'}}>{text}</Text>
  )
}

export default RegularText;