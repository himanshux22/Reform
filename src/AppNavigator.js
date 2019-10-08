import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Start from './Start';
import Thanks from './Thanks';
import Customer from './Customer';
import Questions from './Questions';
import Main from './components/Main';

const AppNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      header: null,
      headerBackTitle: null,
    }),
  },
  Start: {
    screen: Start,
    navigationOptions: ({navigation}) => ({
      title: 'Language select',
      header: null,
      headerBackTitle: null,
    }),
  },
  Thanks: {
    screen: Thanks,
    navigationOptions: ({navigation}) => ({
      title: 'Language select',
      header: null,
      headerBackTitle: null,
    }),
  },
  Questions: {
    screen: Questions,
    navigationOptions: ({navigation}) => ({
      title: 'Question Page',
      header: null,
    }),
  },
  Customer: {
    screen: Customer,
    navigationOptions: ({navigation}) => ({
      title: 'Question Page',
      header: null,
    }),
  },
});
export default createAppContainer(AppNavigator);
