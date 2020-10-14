import React, {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Colors, Button} from 'react-native-paper';

import style from './index.style.js';

const {container, searchStyleTop, textContainer} = style;

const Add = ({navigation}) => {
  const [hari, setHari] = useState('');

  return (
    <View style={container}>
      <View style={textContainer}>
        <TextInput
          mode="outlined"
          label="Hari"
          value={hari}
          style={searchStyleTop}
          onChangeText={(text) => setHari(text)}
          dense
          placeholder="Input Hari"
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
