/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
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
} from './routes';

const Stack = createStackNavigator();

function App({navigation}) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Screen Home */}
        <Stack.Screen
          name="Home Screen"
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
