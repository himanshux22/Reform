import {callService} from './utils/Services';

import React from 'react';
import {
  Dimensions,
  Text,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import Wallpaper from './components/Wallpaper';
import {Button} from 'react-native-elements';
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;
var Alldata = null;
var logindata = null;
var survey = null;
export default class Start extends React.Component {
  state = {language: [], Allquestion: []};
  constructor(props) {
    super(props);
    logindata = this.props.navigation.getParam('logindata', null);
  }

  async componentDidMount() {
    var surveyID = this.props.navigation.getParam('surveyID', null);
    await callService(
      {surveymetaid: surveyID.surveymetaid},
      'apis/index.php/surveyinfo',
      false,
    )
      .then(res => {
        if (res.code == '9991') {
          alert('Survey is empty or Already filled.');
          this.props.navigation.goBack(null);
          return;
        }
        survey = res;
        console.log(res);
        Alldata = res;
        this.setState({
          language: res.langattr.split(','),
        });
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        this.setState({showSpinner: false});
      });

    this.setState({
      language: Alldata.langattr.split(','),
      Allquestion: Alldata.queslist,
    });
  }

  NavigateToQuestion(lang) {
    const {navigate} = this.props.navigation;
    var langQuestions = this.state.Allquestion.filter(
      x => x.lang.toUpperCase() == lang,
    );

    navigate('Questions', {
      Allquestion: langQuestions,
      logindata: logindata,
      survey,
    });
  }

  renderButton = item => {
    return (
      <Button
        key={item}
        title={item.toUpperCase()}
        onPress={() => {
          this.NavigateToQuestion(item.toUpperCase());
        }}
        style={{marginBottom: '6%', borderRadius: 25}}
        titleStyle={{fontSize: 44}}
      />
    );
  };
  render() {
    const {container} = styles;
    return (
      <Wallpaper>
        <Text style={styles.text}>Select Your Language</Text>
        <View style={container}>
          {this.state.language.map(item => {
            return this.renderButton(item);
          })}
        </View>
      </Wallpaper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: '40%',
    marginHorizontal: '20%',
  },
  text: {
    position: 'absolute',
    color: '#fff',
    fontSize: 45,
    top: '30%',
    left: '30%',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
