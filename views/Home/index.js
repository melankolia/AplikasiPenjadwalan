import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Alert} from 'react-native';
import {Colors, Button} from 'react-native-paper';
import style from './index.style';
import AppService from '../../services/resources/app.service';

const {container, box, boxButton, textMenu, buttonBottom} = style;

const Home = ({navigation}) => {
  const [stack, setStack] = useState('initial');
  const [loading, setLoading] = useState(false);

  const createSesi = async () => {
    try {
      setLoading(true);
      await AppService.createSesi()
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Berhasil Membuat Sesi', [
              {
                text: 'OK',
                onPress: () => setStack('sesiCreated'),
              },
            ]);
          } else {
            Alert.alert('Error', 'Gagal Create Sesi Inside');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Create Sesi');
    }
  };

  const deleteSesi = () => {
    console.log('Delete Sesi');
  };

  useEffect(() => {
    console.log('STACK : ', stack);
  }, [stack]);

  return (
    <>
      <ScrollView style={container}>
        {stack === 'initial' && (
          <>
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
          </>
        )}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Dosen')}
          style={[box, {backgroundColor: '#1b8089'}]}>
          <Text style={textMenu}>Pengampu</Text>
        </TouchableOpacity> */}
        {stack === 'createSesi' && (
          <>
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
          </>
        )}
        {stack === 'exception' && (
          <TouchableOpacity
            onPress={() => navigation.navigate('WaktuTidakTersedia')}
            style={[box, {backgroundColor: Colors.red500}]}>
            <Text style={textMenu}>Waktu Tidak Bersedia</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {stack === 'initial' && (
        <View>
          <Button
            mode="contained"
            color={Colors.blueA700}
            onPress={(e) => setStack('createSesi')}>
            Next
          </Button>
        </View>
      )}
      {(stack === 'createSesi' || stack === 'sesiCreated') && (
        <View style={boxButton}>
          <Button
            mode="contained"
            color={Colors.red500}
            style={buttonBottom}
            onPress={(e) => {
              if (stack === 'createSesi') {
                setStack('initial');
              } else if (stack === 'sesiCreated') {
                deleteSesi();
              }
            }}>
            {stack === 'createSesi' ? 'Back' : 'Delete Sesi'}
          </Button>
          {stack === 'createSesi' && (
            <Button
              mode="contained"
              color={Colors.blueA700}
              style={buttonBottom}
              onPress={(e) => createSesi()}>
              {loading ? 'Loading ...' : 'Create Sesi'}
            </Button>
          )}
        </View>
      )}
    </>
  );
};

export default Home;
