'use strict';

import App from './app';

import React, {
  AppRegistry,
  Component,
} from 'react-native';

class ViewPager extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ViewPager', () => ViewPager);
