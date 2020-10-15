import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {marginHorizontal: 30, flex: 1},
  textSignUp: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'AirbnbCerealBold',
    marginBottom: 25,
  },
  textHello: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'AirbnbCerealBook',
  },
  nameStyle: {
    marginHorizontal: -10,
    fontSize: 14,
    fontFamily: 'AirbnbCerealBook',
  },
  passwordStyle: {
    marginHorizontal: -10,
    fontSize: 14,
    fontFamily: 'AirbnbCerealBook',
  },
  textWelcome: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'AirbnbCerealBook',
    marginBottom: 50,
  },
  textRegister: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
  },
  usernameStyle: {
    marginHorizontal: -10,
    fontSize: 14,
    fontFamily: 'AirbnbCerealBook',
  },
  buttonGroupStyle: {
    height: 40,
    marginLeft: 0,
    borderRadius: 50,
    borderColor: 'gray',
  },
  registerStyle: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575A89',
    marginTop: 20,
    padding: 10,
    height: 45,
    width: '100%',
    borderRadius: 10,
  },
  textPolicy: {
    color: '#8c8c8c',
    fontSize: 10,
    fontFamily: 'AirbnbCerealMedium',
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 20,
  },
});

export default style;
