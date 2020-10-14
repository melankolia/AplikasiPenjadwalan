import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  textContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  searchStyle: {
    marginVertical: 10,
    width: '80%',
    color: Colors.blueA700,
  },
  searchStyleTop: {
    marginTop: 20,
    marginBottom: 10,
    width: '80%',
  },
});

export default style;
