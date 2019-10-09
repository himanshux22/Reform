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
  state = {username: '', password: ''};
  SetUsername = username => {
    this.setState({username: username});
  };
  SetPass = pass => {
    this.setState({password: pass});
  };
  render() {
    return (
      <Wallpaper>
        <Logo />
        <View style={{height: DEVICE_WIDTH / 1.5}}>
          <Form Setuser={this.SetUsername} Setpass={this.SetPass} />
          <ButtonSubmit
            username={this.state.username}
            password={this.state.password}
            navigation={this.props.navigation}
          />
        </View>
      </Wallpaper>
    );
  }
}
