import {callService} from './utils/Services';

import React from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import UserInput from './components/UserInput';
import {FlatGrid} from 'react-native-super-grid';

import Wallpaper from './components/Wallpaper';
import {Button} from 'react-native-elements';
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;
import usernameImg from './images/username.png';
import passwordImg from './images/password.png';
let options = [];

export default class Surveys extends React.Component {
  state = {language: [], Alldata: []};

  async componentDidMount() {
    await callService(
      {surveymetaid: 'B3VD71570592974'},
      'apis/index.php/surveyinfo',
      false,
    )
      .then(res => {
        console.log(res);
        this.setState({
          language: res.langattr.split(','),
          Alldata: res,
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({showSpinner: false});
      });
  }

  constructor(props) {
    super(props);
  }

  renderBoxview() {
    const {skeleton, centerEverything, containers, textStyle} = styles;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.props.navigation.navigate('Start', {
            AllData: this.state.Alldata,
          });
        }}>
        <View
          style={[centerEverything, containers, {backgroundColor: '#635eb4'}]}>
          {this.props.icon}
          <Text style={textStyle}>
            What kind of Surveys are you interest in?
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    //const {container} = styles;
    const {
      centerEverything,
      skeleton,
      container,
      textContainer,
      contentContainer,
      listViewContainer,
      titleContainer,
      descContainer,
      title,
      desc,
      submitContainer,
      submitTitle,
    } = styles;
    return (
      <Wallpaper>
        <View style={[container]}>
          <View style={[centerEverything, textContainer]}>
            <View style={titleContainer}>
              <Text style={[title]}>
                What kind of Surveys are you interest in?
              </Text>
            </View>
            <View style={descContainer}>
              <Text style={[desc]}>Select the survey and click start.</Text>
            </View>
          </View>
          <View style={[contentContainer]}>
            <FlatGrid
              itemDimension={winWidth / 3.5}
              items={[1, 2, 3]}
              renderItem={item => {
                return this.renderBoxview();
              }}
            />
          </View>
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  containedr: {
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
  skeleton: {
    borderWidth: 1,
    borderColor: 'red',
  },

  containers: {
    height: 150,
    width: winWidth * 0.28,
    borderRadius: 5,
    margin: 5,
  },
  textStyle: {
    color: '#aeaeae',
    fontSize: 23,
    fontWeight: '500',
    paddingTop: 8,
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F6F7',
    marginTop: 64,
  },
  textContainer: {
    flex: 2,
  },
  contentContainer: {
    flex: 8,
    padding: 10,
  },
  listViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleContainer: {
    width: winWidth * 0.8,
  },
  descContainer: {
    width: winWidth * 0.6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center',
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center',
  },
  submitContainer: {
    height: winWidth * 0.08,
    width: winWidth * 0.5,
    marginBottom: winWidth * 0.1,
    backgroundColor: '#4169E1',
    borderRadius: 5,
  },
  submitTitle: {
    color: 'white',
    fontSize: 45,
    fontWeight: '500',
  },
});
