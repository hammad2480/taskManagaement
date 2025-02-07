import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {landing} from '../assets/svgs';

const LandingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the task management system !</Text>
      <Text style={styles.subHeading}>
        Where you can create and assign tasks to users 📝
      </Text>

      <View style={styles.svg}>
        <SvgXml xml={landing} width={300} height={300} />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Bottom')}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFAE3',
  },
  svg: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '20%',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LandingScreen;
