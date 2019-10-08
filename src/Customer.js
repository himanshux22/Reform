import {callService} from './utils/Services';

import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import UserInput from './components/UserInput';

import Wallpaper from './components/Wallpaper';
import {Button} from 'react-native-elements';
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;
import usernameImg from './images/username.png';
import passwordImg from './images/password.png';
let options = [];

export default class Customer extends React.Component {
  state = {language: [], Allquestion: []};
  // async componentDidMount() {
  //   await callService(
  //     {surveymetaid: '500xn1569826741'},
  //     'apis/index.php/surveyinfo',
  //     false,
  //   )
  //     .then(res => {
  //       console.log(res);
  //       this.setState({
  //         language: res.langattr.split(','),
  //         Allquestion: res.queslist,
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //     .finally(() => {
  //       this.setState({showSpinner: false});
  //     });
  // }

  NavigateToThanks() {
    const {navigate} = this.props.navigation;

    navigate('Thanks');
  }
  constructor(props) {
    super(props);
    options = this.props.navigation.getParam('options', null);
  }
  render() {
    const {container} = styles;
    return (
      <Wallpaper>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.text}>Please Enter the following details.</Text>

          <UserInput
            source={usernameImg}
            placeholder="Name "
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <UserInput
            source={usernameImg}
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <UserInput
            source={usernameImg}
            placeholder="Mobile"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <UserInput
            source={usernameImg}
            placeholder="Address"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
          />
          <Button
            title="Submit"
            onPress={() => {
              this.NavigateToThanks();
            }}
            style={{marginBottom: '6%', width: 555, borderRadius: 25}}
            titleStyle={{fontSize: 44}}
          />
        </KeyboardAvoidingView>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '40%',
  },
  text: {
    color: '#fff',
    fontSize: 45,
    marginBottom: '5%',
    fontWeight: 'bold',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
});
