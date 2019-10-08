import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  Image,
  Dimensions,
  Alert,
  View,
} from 'react-native';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class LoginScreen extends Component {
  render() {
    return (
      <Wallpaper>
        <Logo />
        <View style={{height: DEVICE_WIDTH / 1.5}}>
          <Form />
          <ButtonSubmit navigation={this.props.navigation} />
        </View>
      </Wallpaper>
    );
  }
}
