import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import ViewPager from 'react-native-view-pager';

export default class App extends Component {
  constructor(props) {
    super(props);

    this._viewPager = null;

    this.state = {
      page: 3,
      pageScroll: '',
      pageSelected: '',
      scrollState: ''
    }
  }

  render() {
    var pages = [];
    for(i = 1; i <= 10; i++) {
      pages.push(this._renderPage(i));
    }

    return (
      <View style={styles.container}>
        <ViewPager
          ref={(viewPager) => {this._viewPager = viewPager}}
          style={styles.scrollview}
          initialPage={this.state.page}
          onPageScroll={this._onPageScroll.bind(this)}
          onPageSelected={this._onPageSelected.bind(this)}
          onPageScrollStateChanged={this._onPageScrollStateChanged.bind(this)}>
          {pages}
        </ViewPager>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={this._previousPage.bind(this)}>
            <Text style={styles.message}>Previous</Text>
          </TouchableOpacity>
          <View style={styles.status}>
            <Text style={styles.message}>Page scroll: {this.state.pageScroll}</Text>
            <Text style={styles.message}>Selected page: {this.state.page}</Text>
            <Text style={styles.message}>Scroll state: {this.state.scrollState}</Text>
          </View>
          <TouchableOpacity style={styles.button}  onPress={this._nextPage.bind(this)}>
            <Text style={styles.message}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  _renderPage(index) {
    var date = moment().add(index, 'days');
    return (
      <View key={index}>
        <View style={styles.page}>
          <Text style={styles.dayname}>{date.format('dddd')}</Text>
          <Text style={styles.day}>{date.format('D')}</Text>
          <Text style={styles.month}>{date.format('MMMM')}</Text>
        </View>
      </View>
    );
  }

  _nextPage(event) {
    var page = Math.min(this.state.page + 1, 9);
    this._viewPager.setPage(page);
    this.setState({
      page: page
    });
  }

  _previousPage(event) {
    var page = Math.max(this.state.page - 1, 0);
    this._viewPager.setPage(page);
    this.setState({
      page: page
    });
  }

  _onPageScroll(event) {
    var offset = parseFloat(Math.round(event.nativeEvent.offset * 100) / 100).toFixed(4);
    this.setState({
      pageScroll: event.nativeEvent.position + ' ('+offset+')'
    });
  }

  _onPageSelected(event) {
    this.setState({
      page: event.nativeEvent.position
    });
  }

  _onPageScrollStateChanged(state) {
    this.setState({
      scrollState: state
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: '#031634',
  },
  page: {
    flex: 1,
    margin: 20,
    backgroundColor: '#E8DDCB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayname: {
    fontSize: 25,
    color: '#036564',
  },
  day: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#033649',
  },
  month: {
    fontSize: 25,
    color: '#036564',
  },
  bottom: {
    height: 60,
    backgroundColor: '#031634',
    flexDirection: 'row',
  },
  status: {
    flex: 1,
  },
  button: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    color: '#E8DDCB',
  }
});
