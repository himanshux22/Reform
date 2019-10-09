import {callService} from './utils/Services';

import React from 'react';
import {
  Dimensions,
  Text,
  ImageBackground,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Textarea from 'react-native-textarea';

import {Button} from 'react-native-elements';
import Wallpaper from './components/Wallpaper';

import Swiper from 'react-native-swiper';

import {CheckBox} from 'react-native-elements';
import {FlatGrid} from 'react-native-super-grid';

const winHeight = Dimensions.get('window').height;
const winWidth = Dimensions.get('window').width;

let logindata = null;
var survey = null;

export default class Questions extends React.Component {
  state = {showSubmit: false, ShowNext: false, AnswerArray: []};
  LangQuestion = [];
  constructor(props) {
    super(props);
    LangQuestion = this.props.navigation.getParam('Allquestion', null);
    logindata = this.props.navigation.getParam('logindata', null);
    survey = this.props.navigation.getParam('survey', null);
  }

  componentWillMount() {
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
        } else {
          var answerkey = item.questionid + '-' + 'Textbox';

          this.setState({[answerkey]: ''});
        }
      });
    }
  }
  SubmitQuestions() {
    console.log(this.state.AnswerArray);
    var options = [];
    //create for essay first
    LangQuestion.map(item => {
      if (item.type == 'Essay') {
        var answerkey = item.questionid + '-' + 'Textbox';

        var obj = {
          questionid: item.questionid,
          type: item.type,
          answerid: '',
          answercode: '',
          answermsg: this.state[answerkey],
        };
        options.push(obj);
      }
    });
    this.state.AnswerArray.forEach(element => {
      var data = element.split('-');
      var qid = data[0];
      var ans = data[1];
      var fullques = LangQuestion.filter(x => x.questionid == qid);
      var singleoption = fullques[0].options.filter(y => y.OPTION_ID == ans);
      var obj = {
        questionid: qid,
        type: fullques[0].type,
        answerid: ans,
        answercode: singleoption[0].OPTION_CODE,
        answermsg: '',
      };
      options.push(obj);
    });
    console.log(options);
    this.props.navigation.navigate('Customer', {
      options: options,
      logindata: logindata,
      survey,
    });
  }
  renderQuestion = item => {
    return (
      <Wallpaper>
        <View style={styles.slide}>
          <Text key={item.questionid} color="#841584" style={styles.text}>
            {item.question}
          </Text>
          <View style={{marginTop: '10%'}}>
            {this.renderChoice(item.options, item.type, item.questionid)}
          </View>
        </View>
        {this.state.showSubmit && this.state.ShowNext ? (
          <Button
            title="Submit"
            onPress={() => {
              this.SubmitQuestions();
            }}
            titleStyle={{fontSize: 44, fontWeight: 'bold', color: 'white'}}
            buttonStyle={{backgroundColor: '#35cc95', borderRadius: 25}}
            style={{
              bottom: winWidth / 7,
              marginHorizontal: '28%',
            }}
          />
        ) : null}
      </Wallpaper>
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
              textStyle={styles.OptionText}
              checked={this.state[answerkey]}
              onPress={() => {
                this.setState({ShowNext: true});
                var arr = this.state.AnswerArray;
                !this.state.AnswerArray.includes(answerkey)
                  ? arr.push(answerkey)
                  : null;
                this.setState({
                  [answerkey]: !this.state[answerkey],
                  AnswerArray: arr,
                });
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
      var filteredAry = this.state.AnswerArray.filter(e => e !== answerkey);

      this.setState({[answerkey]: false, AnswerArray: filteredAry});
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
              containerStyle={styles.Checkcontainer}
              textStyle={styles.OptionText}
              checked={this.state[answerkey]}
              onPress={() => {
                this.setState({ShowNext: true});
                this.removeOtherKey(answerkey);

                var arr = this.state.AnswerArray;
                !this.state.AnswerArray.includes(answerkey)
                  ? arr.push(answerkey)
                  : null;
                this.setState({
                  [answerkey]: !this.state[answerkey],
                  AnswerArray: arr,
                });
              }}
            />
          );
        }}
      />
    );
  }

  renderEssay(questionid) {
    return (
      <View style={styles.textareaContainer}>
        <Textarea
          multiline={true}
          containerStyle={styles.textareaContainer}
          placeholderTextColor="white"
          style={styles.textarea}
          maxLength={300}
          placeholder="Start Writing from here.."
          onChangeText={text => {
            var answerkey = questionid + '-' + 'Textbox';

            if (text.length > 3) {
              this.setState({ShowNext: true, [answerkey]: text});
            }
          }}
        />
      </View>
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
                this.setState({ShowNext: true});

                this.removeOtherKey(answerkey);
                var arr = this.state.AnswerArray;
                !this.state.AnswerArray.includes(answerkey)
                  ? arr.push(answerkey)
                  : null;
                this.setState({
                  [answerkey]: !this.state[answerkey],
                  AnswerArray: arr,
                });
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
                  textStyle={styles.OptionText}
                  onPress={() => {
                    this.setState({ShowNext: true});
                    this.removeOtherKey(answerkey);
                    var arr = this.state.AnswerArray;
                    !this.state.AnswerArray.includes(answerkey)
                      ? arr.push(answerkey)
                      : null;
                    this.setState({
                      [answerkey]: !this.state[answerkey],
                      AnswerArray: arr,
                    });
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
      return <View key={option.OPTION_ID}>{this.renderEssay(questionid)}</View>;
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
        showsPagination={false}
        scrollEnabled={false}
        showsButtons={true}
        onIndexChanged={index => {
          this.setState({ShowNext: false});

          if (LangQuestion.length - 1 == index) {
            this.setState({showSubmit: true});
          } else {
            this.setState({showSubmit: false});
          }
        }}
        buttonWrapperStyle={styles.buttonWrapper}
        nextButton={
          this.state.ShowNext ? (
            <Text style={styles.buttonText}>Next ›</Text>
          ) : null
        }
        prevButton={<Text style={styles.buttonText}>‹ Previous</Text>}>
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
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    padding: '12%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '15%',
  },
  buttonText: {
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
  },
  OptionText: {
    color: '#F035E0',
    fontSize: 37,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '10%',
    alignItems: 'center',
    padding: '10%',
    backgroundColor: 'transparent',
  },
  text: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },
  Checkcontainer: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textareaContainer: {
    height: '100%',
    width: winWidth / 1.3,
    padding: 5,
    backgroundColor: 'transparent',
    borderWidth: 1.2,
    borderColor: 'white',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
  },
});
