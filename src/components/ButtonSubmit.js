import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  Easing,
  Image,
  Alert,
  View,
} from 'react-native';
import {callService} from '../utils/Services';

import {StackActions, NavigationActions} from 'react-navigation';

import spinner from '../images/loading.gif';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = DEVICE_WIDTH / 15;
let logindata = null;
export default class ButtonSubmit extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
    this._onPress = this._onPress.bind(this);
  }

  async LoginAPI() {
    if (this.props.username == '' || this.props.password == '') {
      alert('Please enter username and password');
      return;
    }

    await callService(
      //{accid: '9998887777', accpwd: 'pass'},
      {accid: this.props.username, accpwd: this.props.password},

      'apis/index.php/custlogin',
      false,
    )
      .then(res => {
        logindata = res;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({showSpinner: false});
      });
  }
  async _onPress() {
    if (this.state.isLoading) return;
    var tt = await this.LoginAPI();

    if (logindata == null || logindata.code == '9992') {
      alert('Invalid Login');
      return;
    }
    this.setState({isLoading: true});
    Animated.timing(this.buttonAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();

    setTimeout(async () => {
      this._onGrow();
    }, 2000);

    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Surveys',
            params: {logindata: logindata},
          }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
      this.setState({isLoading: false});
      this.buttonAnimated.setValue(0);
      this.growAnimated.setValue(0);
    }, 2300);
  }

  _onGrow() {
    Animated.timing(this.growAnimated, {
      toValue: 1,
      duration: 200,
      easing: Easing.linear,
    }).start();
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{width: changeWidth}}>
          <TouchableOpacity
            style={styles.button}
            onPress={this._onPress}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Image source={spinner} style={styles.image} />
            ) : (
              <Text style={styles.text}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, {transform: [{scale: changeScale}]}]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    marginHorizontal: '14%',
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    width: 24,
    height: 24,
  },
});
