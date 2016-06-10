import React, {Component} from 'react';
import {
  ViewPagerAndroid
} from 'react-native';

var VIEWPAGER_REF = 'viewPager';

export default class ViewPager extends Component {
  render() {
    return <ViewPagerAndroid ref={VIEWPAGER_REF} {...this.props} />
  }

  setPage(page) {
    return this.refs[VIEWPAGER_REF].setPage(page);
  }

  setPageWithoutAnimation(page) {
    return this.refs[VIEWPAGER_REF].setPageWithoutAnimation(page);
  }
}
