import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  cidade: {
    fontSize: 32,
    color: 'white',
  },
  description: {
    fontSize: 20,
    color: 'white'
  },
  temp: {
    fontSize: 102,
    fontWeight: '200',
    color: 'white',
    textAlign: 'center'
  },
  max_min: {
    fontSize: 20,
    color: 'white',
    margin: 15,
  },
  main: {
    backgroundColor: '#497CB1',
    width: '100%',
    marginTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    lineHeight: 30,
  },
  form: {
    backgroundColor: '#497CB1',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: 200,
    fontSize: 18,
    color: 'white',
  },
  titleButton: {
    fontSize: 18,
    color: 'white'
  }
});