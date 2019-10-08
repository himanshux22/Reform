import {callService} from './utils/Services';

import React from 'react';
import {
  Dimensions,
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';

import {CheckBox} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';

const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;
export default class Questions extends React.Component {
  state = {};
  LangQuestion = [];
  constructor(props) {
    super(props);
    LangQuestion = this.props.navigation.getParam('Allquestion', null);
  }

  componentDidMount() {
    if (LangQuestion != null) {
      LangQuestion.forEach((item, index) => {
        if (item.options.length != 0) {
          item.options.forEach((items, index) => {
            var answerkey = item.questionid + '-' + items.OPTION_ID;

            this.setState({[answerkey]: false});
          });
        }
      });
    }
  }

  renderQuestion = item => {
    return (
      <View style={styles.slide}>
        <Text key={item.questionid} color="#841584" style={styles.text}>
          {item.question}
        </Text>
        {this.renderChoice(item.options, item.type, item.questionid)}
      </View>
    );
  };

  renderCheckbox(option, questionid) {
    return (
      <FlatGrid
        key={questionid + '-'}
        itemDimension={winWidth / 3.5}
        items={option}
        renderItem={item => {
          var answerkey = questionid + '-' + item.item.OPTION_ID;
          return (
            <CheckBox
              key={item.item.OPTION_ID}
              title={item.item.OPTION_NAME}
              textStyle={{fontSize: 22}}
              checked={this.state[answerkey]}
              onPress={() => {
                this.setState({[answerkey]: !this.state[answerkey]});
              }}
            />
          );
        }}
      />
    );
  }

  removeOtherKey(key) {
    var questionid = key.split('-')[0];

    var question = LangQuestion.filter(x => x.questionid == questionid);
    var totallen = question[0].options.length;

    for (i = 0; i < totallen; i++) {
      var answerkey = questionid + '-' + question[0].options[i].OPTION_ID;
      this.setState({[answerkey]: false});
    }
  }

  renderRadio(option, questionid) {
    return (
      <FlatGrid
        key={questionid + '-'}
        itemDimension={winWidth / 3.5}
        items={option}
        renderItem={item => {
          var answerkey = questionid + '-' + item.item.OPTION_ID;

          return (
            <CheckBox
              key={item.item.OPTION_ID}
              title={item.item.OPTION_NAME}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              textStyle={{fontSize: 22}}
              checked={this.state[answerkey]}
              onPress={() => {
                this.removeOtherKey(answerkey);
                this.setState({[answerkey]: !this.state[answerkey]});
              }}
            />
          );
        }}
      />
    );
  }

  renderEssay() {
    return (
      <TextInput
        multiline={true}
        numberOfLines={7}
        style={{fontSize: 32}}
        placeholder="Write your thought here.."
      />
    );
  }

  renderImage(option, questionid) {
    return (
      <FlatGrid
        key={questionid + '-'}
        itemDimension={winWidth / 3.5}
        items={option}
        renderItem={item => {
          var answerkey = questionid + '-' + item.item.OPTION_ID;

          return (
            <TouchableOpacity
              onPress={() => {
                this.removeOtherKey(answerkey);

                this.setState({[answerkey]: !this.state[answerkey]});
              }}>
              <ImageBackground
                style={{
                  flex: 1,
                  width: winWidth / 3,
                  height: winWidth / 3,
                  margin: '10%',
                  resizeMode: 'cover',
                  borderColor: '#ddd',
                }}
                source={{uri: item.item.OPTION_NAME}}>
                <CheckBox
                  checked={this.state[answerkey]}
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  style={{color: 'transparent'}}
                  containerStyle={{color: 'transparent'}}
                  onPress={() => {
                    this.removeOtherKey(answerkey);
                    this.setState({[answerkey]: !this.state[answerkey]});
                  }}
                />
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
  renderChoice(option, type, questionid) {
    if (type == 'Essay') {
      return <View key={option.OPTION_ID}>{this.renderEssay()}</View>;
    }

    if (type == 'Image') {
      return this.renderImage(option, questionid);
    }

    if (type == 'Multiple Choice') {
      return this.renderRadio(option, questionid);
    }

    if (type == 'Form' || type == 'Rating') {
      return this.renderCheckbox(option, questionid);
    }
  }
  render() {
    const {container} = styles;
    return (
      <Swiper
        style={styles.wrapper}
        loop={false}
        scrollEnabled={false}
        showsButtons={true}>
        {LangQuestion.map(item => {
          return this.renderQuestion(item);
        })}
      </Swiper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: '10%',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#9DD6EB',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
