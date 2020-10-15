import React from 'react';
import {ScrollView, TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native-paper';
import style from './index.style';

const {container, box, textMenu} = style;

const Home = ({navigation}) => {
  return (
    <>
      <ScrollView style={container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dosen')}
          style={[box, {backgroundColor: '#072446'}]}>
          <Text style={textMenu}>Dosen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Matakuliah')}
          style={[box, {backgroundColor: '#043a67'}]}>
          <Text style={textMenu}>Matakuliah</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Dosen')}
          style={[box, {backgroundColor: '#1b8089'}]}>
          <Text style={textMenu}>Pengampu</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Ruang')}
          style={[box, {backgroundColor: '#115d6b'}]}>
          <Text style={textMenu}>Ruang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Jam')}
          style={[box, {backgroundColor: '#2bb1a5'}]}>
          <Text style={textMenu}>Jam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Hari')}
          style={[box, {backgroundColor: '#2bb1a5'}]}>
          <Text style={textMenu}>Hari</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('WaktuTidakTersedia')}
          style={[box, {backgroundColor: Colors.red500}]}>
          <Text style={textMenu}>Waktu Tidak Bersedia</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Home;
