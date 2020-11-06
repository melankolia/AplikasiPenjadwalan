import React, {useState} from 'react';
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
            Alert.alert('Error', result || 'Gagal Create Sesi');
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

  const handlerNext = async () => {
    try {
      setLoading(true);
      await AppService.countMatkul()
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            if (result?.total) {
              setStack('createSesi');
            } else {
              Alert.alert('Error', 'Matakuliah mohon diisi terlebih dahulu');
            }
          } else {
            Alert.alert('Error', 'Gagal Check Jumlah Matakuliah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Check Jumlah Matakuliah');
    }
  };

  const generateJadwal = async () => {
    try {
      setLoading(true);
      await AppService.generateJadwal()
        .then(({data: {result, message}}) => {
          console.log(result);
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Berhasil Generate Jadwal Kuliah', [
              {
                text: 'OK',
                onPress: () => {
                  navigation.replace('JadwalKuliah');
                },
              },
            ]);
          } else {
            Alert.alert('Error', result || 'Gagal Generate Jadwal Kuliah');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      Alert.alert('Error', 'Gagal Generate Jadwal Kuliah');
    }
  };

  const deleteSesi = async () => {
    try {
      setLoading(true);
      await AppService.cleanUpSesi()
        .then(({data: {result, message}}) => {
          if (message === 'OK') {
            Alert.alert('Berhasil', 'Berhasil Mengapus Sesi', [
              {
                text: 'OK',
                onPress: () => setStack('initial'),
              },
            ]);
          } else {
            Alert.alert('Error', 'Gagal Menghapus Sesi');
          }
        })
        .catch((err) => {
          throw new Error(err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Gagal Menghapus Sesi');
    }
  };

  const confirmationDelete = () => {
    Alert.alert('Caution', 'Hapus Data Sesi ?', [
      {text: 'CANCEL', onPress: () => navigation.navigate('Home')},
      {text: 'OK', onPress: () => deleteSesi()},
    ]);
  };

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
        {stack === 'sesiCreated' && (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Sesi')}
              style={[box, {backgroundColor: Colors.blue400}]}>
              <Text style={textMenu}>Sesi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('WaktuTidakTersedia')}
              style={[box, {backgroundColor: Colors.red500}]}>
              <Text style={textMenu}>Waktu Tidak Bersedia</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
      {stack === 'initial' && (
        <View style={boxButton}>
          <Button
            mode="contained"
            style={buttonBottom}
            color={Colors.blueA700}
            disabled={loading}
            onPress={(e) => handlerNext()}>
            {loading ? 'Loading ...' : 'Next'}
          </Button>
        </View>
      )}
      {(stack === 'createSesi' || stack === 'sesiCreated') && (
        <View style={boxButton}>
          <Button
            mode="contained"
            color={Colors.red500}
            style={buttonBottom}
            disabled={loading}
            onPress={(e) => {
              if (stack === 'createSesi') {
                setStack('initial');
              } else if (stack === 'sesiCreated') {
                confirmationDelete();
              }
            }}>
            {stack === 'createSesi' ? 'Back' : 'Delete Sesi'}
          </Button>
          {stack === 'sesiCreated' && (
            <Button
              mode="contained"
              color={Colors.blueA700}
              style={buttonBottom}
              disabled={loading}
              onPress={(e) => generateJadwal()}>
              {loading ? 'Loading ...' : 'Generate Jadwal Kuliah'}
            </Button>
          )}
          {stack === 'createSesi' && (
            <Button
              mode="contained"
              color={Colors.blueA700}
              style={buttonBottom}
              disabled={loading}
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
