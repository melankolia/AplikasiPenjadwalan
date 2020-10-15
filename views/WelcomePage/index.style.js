import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#AB84C8',
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'AirbnbCerealBold',
    marginTop: 30,
    paddingLeft: 35,
    paddingRight: 20,
  },
  secondTitle: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'AirbnbCerealMedium',
    paddingLeft: 35,
    paddingRight: 20,
    marginTop: 5,
  },
  imageStyle: {
    marginTop: 0,
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  containerButton: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  signInStyle: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 10,
    height: 45,
    width: 300,
    borderRadius: 10,
  },
  signUpStyle: {
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#575A89',
    marginTop: 10,
    padding: 10,
    height: 45,
    width: 300,
    borderRadius: 10,
  },
});

export default style;
