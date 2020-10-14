import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import style from './index.style.js';

export default function Button({callback}) {
  const {container, textStyle} = style;
  return (
    <TouchableOpacity onPress={() => callback()} style={container}>
      <Text style={textStyle}>{'Go To Detail'}</Text>
    </TouchableOpacity>
  );
}
