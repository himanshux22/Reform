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
import email from './images/email.png';
import call from './images/call.png';
import location from './images/location.png';

let options = [];
let logindata = null;
let survey = null;
let submitresponse = null;

export default class Customer extends React.Component {
  state = {
    language: [],
    Allquestion: [],
    Name: '',
    Address: '',
    Email: '',
    Mobile: '',
  };
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
  async SubmitApi() {
    var submitData = {
      surveyid: survey.surveyid,
      empid: logindata.empid,
      name: this.state.Name, //logindata.fstname + ' ' + logindata.lastname,
      email: this.state.Email, //logindata.email,
      orgid: logindata.orgid,
      mobile: this.state.Mobile,
      addr: this.state.Address,
      imgurl: '',
      options: options,
    };
    console.log(JSON.stringify(submitData));
    await callService(submitData, 'apis/index.php/submitsurvey', false)
      .then(res => {
        submitresponse = res;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.NavigateToThanks();
        this.setState({showSpinner: false});
      });
  }
  NavigateToThanks() {
    const {navigate} = this.props.navigation;

    navigate('Thanks');
  }
  constructor(props) {
    super(props);
    options = this.props.navigation.getParam('options', null);
    logindata = this.props.navigation.getParam('logindata', null);
    survey = this.props.navigation.getParam('survey', null);

    console.log(logindata);
  }

  saveName = name => {
    this.setState({Name: name});
  };

  saveMobile = mob => {
    this.setState({Mobile: mob});
  };

  saveEmail = email => {
    this.setState({Email: email});
  };

  saveAdd = add => {
    this.setState({Address: add});
  };

  render() {
    const {container} = styles;
    return (
      <Wallpaper>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Text style={styles.text}>Please Enter the following details.</Text>
          {survey.capturename ? (
            <UserInput
              source={usernameImg}
              placeholder="Name "
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              Setdata={this.saveName}
            />
          ) : null}
          {survey.captureemail ? (
            <UserInput
              source={email}
              placeholder="Email"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              Setdata={this.saveEmail}
            />
          ) : null}

          {survey.capturemobile ? (
            <UserInput
              source={call}
              placeholder="Mobile"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              Setdata={this.saveMobile}
            />
          ) : null}
          {survey.captureaddress ? (
            <UserInput
              source={location}
              placeholder="Address"
              autoCapitalize={'none'}
              returnKeyType={'done'}
              autoCorrect={false}
              Setdata={this.saveAdd}
            />
          ) : null}
          <Button
            title="Submit"
            onPress={() => {
              this.SubmitApi();
            }}
            titleStyle={{fontSize: 44, fontWeight: 'bold', color: 'white'}}
            buttonStyle={{backgroundColor: '#35cc95', borderRadius: 25}}
            style={{marginBottom: '6%', width: 555, borderRadius: 25}}
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
