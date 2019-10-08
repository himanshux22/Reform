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
import {StackActions, NavigationActions} from 'react-navigation';

import {Button} from 'react-native-elements';
const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;

let options = [];

export default class Thanks extends React.Component {
  state = {language: [], Allquestion: []};
  //async componentDidMount() {
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
  constructor(props) {
    super(props);
  }

  render() {
    const {container} = styles;
    return (
      <Wallpaper>
        <Text style={styles.text}>Thank you for your valuable response.</Text>
        <View style={container}>
          <Button
            title="Back To Home"
            onPress={() => {
              const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({routeName: 'Main'})],
              });
              this.props.navigation.dispatch(resetAction);
            }}
            style={{marginBottom: '6%', borderRadius: 25}}
            titleStyle={{fontSize: 44}}
          />
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
    left: '13%',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
