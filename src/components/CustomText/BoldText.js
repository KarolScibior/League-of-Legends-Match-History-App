import React from 'react';
import { Text } from 'react-native';

const BoldText = (props) => {
  const { text, style } = props;

  return (
    <Text style={{...style, fontFamily: 'montserratBold'}}>{text}</Text>
  )
}

export default BoldText;