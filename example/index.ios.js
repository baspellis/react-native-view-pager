'use strict';

import App from './app';

import React, {Component} from 'react';
import {
  AppRegistry
} from 'react-native';

class ViewPager extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ViewPager', () => ViewPager);
