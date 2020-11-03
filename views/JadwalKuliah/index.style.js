import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  titleContainerText: {
    paddingVertical: 30,
    marginBottom: 30,
    paddingHorizontal: '5%',
    backgroundColor: '#072446',
    // borderColor: 'red',
    // borderWidth: 2,
  },
  searchStyle: {
    marginVertical: 20,
  },
  headerStyle: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    color: 'white',
  },
  actionCell: {
    justifyContent: 'center',
  },
  addButton: {
    paddingVertical: 4,
  },
});

export default style;
