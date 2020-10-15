import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    flex: 1,
  },
  imageStyle: {
    marginTop: -15,
    width: 170,
    height: 180,
    resizeMode: 'contain',
  },
  inputLabel: {
    marginHorizontal: -10,
    fontSize: 12,
    fontFamily: 'AirbnbCerealBook',
  },
  textProceed: {
    color: 'black',
    fontSize: 24,
    fontFamily: 'AirbnbCerealBook',
    marginBottom: -5,
  },
  textLogin: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'AirbnbCerealBold',
    marginBottom: 100,
  },
  usernameStyle: {
    marginHorizontal: -10,
    fontSize: 12,
    fontFamily: 'AirbnbCerealBook',
  },
  inputContainer: {marginLeft: -10, height: 35},
  buttonLogin: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575A89',
    marginTop: 30,
    padding: 10,
    height: 45,
    width: '100%',
    borderRadius: 10,
  },
  textButtonLogin: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'AirbnbCerealMedium',
  },
  textForget: {
    color: '#8c8c8c',
    fontSize: 12,
    fontFamily: 'AirbnbCerealMedium',
    marginBottom: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default style;
