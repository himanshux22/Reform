import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions, Image} from 'react-native';

import logoImg from '../images/logo.png';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.text}>REFORM</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10%',
  },
  image: {
    width: DEVICE_WIDTH / 3,
    height: DEVICE_WIDTH / 3,
    resizeMode: 'cover',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 45,
  },
});
