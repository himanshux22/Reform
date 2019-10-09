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

export default class Start extends React.Component {
  state = {language: [], Allquestion: []};
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    AllData = this.props.navigation.getParam('AllData', null);

    this.setState({
      language: AllData.langattr.split(','),
      Allquestion: AllData.queslist,
    });
  }

  NavigateToQuestion(lang) {
    const {navigate} = this.props.navigation;
    var langQuestions = this.state.Allquestion.filter(
      x => x.lang.toUpperCase() == lang,
    );

    navigate('Questions', {Allquestion: langQuestions});
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
