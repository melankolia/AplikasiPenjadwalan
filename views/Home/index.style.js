import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth: 4,
    // borderColor: 'red',
    // backgroundColor: 'red',
    marginTop: 30,
  },
  box: {
    height: 140,
    // borderWidth: 4,
    // borderColor: 'black',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  textMenu: {
    fontSize: 24,
    color: '#FFFF',
    margin: 24,
    fontWeight: 'bold',
  },
  boxButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBottom: {
    height: 40,
    marginBottom: 10,
    width: '90%',
  },
});

export default style;
