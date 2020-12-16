/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from './Helper/AsyncStorage';
import {
  Home,
  DosenScreen,
  AddMataKuliah,
  AddDosen,
  MataKuliah,
  Ruang,
  AddRuang,
  Jam,
  AddJam,
  Hari,
  AddHari,
  Waktu,
  AddWaktu,
  WelcomePage,
  Login,
  Register,
  test1,
  Sesi,
  JadwalKuliah,
} from './routes';

const Stack = createStackNavigator();

function App({navigation}) {
  function storeDosen() {
    let obj = [
      {nidn: '12345678', name: 'Dosen 1', telp: '08127803910', lala: 2},
      {nidn: '12345678', name: 'Dosen 2', telp: '08127803910', lala: 3},
      {nidn: '12345678', name: 'Dosen 2', telp: '08127803910', lala: 4},
      {nidn: '12345678', name: 'Dosen 2', telp: '08127803910', lala: 5},
      {nidn: '12345678', name: 'Dosen 2', telp: '08127803910', lala: 6},
    ];
    AsyncStorage.storeData(obj, 'storeDosen');
  }

  function storeHari() {
    let obj = [
      {no: '1', hari: 'Senin'},
      {no: '2', hari: 'Selasa'},
      {no: '3', hari: 'Rabu'},
      {no: '4', hari: 'Kamis'},
    ];
    AsyncStorage.storeData(obj, 'storeHari');
  }

  function storeJam() {
    let obj = [
      {no: '1', time: '08.30 - 09.00'},
      {no: '2', time: '09.00 - 09.30'},
      {no: '3', time: '09.30 - 10.00'},
      {no: '4', time: '10.00 - 11.00'},
    ];
    AsyncStorage.storeData(obj, 'storeJam');
  }

  function storeMatkul() {
    let obj = [
      {
        codeMk: 'SK421',
        name: 'Interaksi Manusia dan Komputer',
        sks: 3,
        semester: 7,
        jenis: 'Teori',
      },
      {
        codeMk: 'SK123',
        name: 'Kriptografi',
        sks: 3,
        semester: 7,
        jenis: 'Teori',
      },
    ];
    AsyncStorage.storeData(obj, 'storeMatkul');
  }

  function storeRuang() {
    let obj = [
      {name: 'GB 1', capacity: 40, type: 'TEORI'},
      {name: 'GB 2', capacity: 40, type: 'TEORI'},
      {name: 'GB 3', capacity: 40, type: 'TEORI'},
      {name: 'GB 4', capacity: 40, type: 'TEORI'},
    ];
    AsyncStorage.storeData(obj, 'storeRuang');
  }

  function setUpAccount() {
    let obj = {
      username: 'admin',
      name: 'admin',
      password: 'admin',
    };
    AsyncStorage.storeData(obj, 'setUpAccount');
  }

  useEffect(() => {
    storeDosen();
    storeHari();
    storeJam();
    storeMatkul();
    storeRuang();
    setUpAccount();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Welcome Page */}
        {/* <Stack.Screen
          name="test1"
          component={test1}
          options={{headerShown: false}}
        /> */}
        {/* Welcome Page */}
        <Stack.Screen
          name="Welcome"
          component={WelcomePage}
          options={{headerShown: false}}
        />
        {/* Login Page */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        {/* Register Page */}
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        {/* Screen Home */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        {/* Screen Dosen  */}
        <Stack.Screen
          name="Dosen"
          component={DosenScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Dosen" component={AddDosen} />

        {/* Screen Matakuliah */}
        <Stack.Screen
          name="Matakuliah"
          component={MataKuliah}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Matakuliah" component={AddMataKuliah} />

        {/* Screen Matakuliah */}
        <Stack.Screen
          name="Ruang"
          component={Ruang}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Ruang" component={AddRuang} />

        {/* Screen Matakuliah */}
        <Stack.Screen
          name="Jam"
          component={Jam}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Jam" component={AddJam} />

        {/* Screen Matakuliah */}
        <Stack.Screen
          name="Hari"
          component={Hari}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Hari" component={AddHari} />

        {/* Screen Matakuliah */}
        <Stack.Screen
          name="WaktuTidakTersedia"
          component={Waktu}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Add Waktu" component={AddWaktu} />
        <Stack.Screen
          name="Sesi"
          component={Sesi}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="JadwalKuliah"
          component={JadwalKuliah}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
