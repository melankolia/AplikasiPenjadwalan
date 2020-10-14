import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [time, setTime] = useState('');

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Range Jam"
          value={time}
          style={searchStyleTop}
          onChangeText={(text) => setTime(text)}
          dense
          placeholder="Input Range Jam"
        />
      </View>
      <View>
        <Button
          icon="content-save"
          mode="contained"
          color={Colors.blueA700}
          onPress={() => console.log('ADD DOSEN')}>
          Save
        </Button>
      </View>
    </View>
  );
};

export default Add;
