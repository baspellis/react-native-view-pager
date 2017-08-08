import React, { Component } from 'react';

import {
  ScrollView,
} from 'react-native';

export default class ViewPager extends Component {
  constructor(props) {
    super(props);

    this._scrollView = null;
    this._selectedPage = this.props.initialPage % 1 === 0 ? this.props.initialPage : 0;

    this.state = {
      size: {
        width: 0,
        height: 0,
      }
    }
  }

  setPage(selectedPage: number) {
    this._scrollToPage(selectedPage, true);
  }

  setPageWithoutAnimation(selectedPage: number) {
    this._scrollToPage(selectedPage, false);
  }

  render() {
    return <ScrollView
      {...this.props}
      ref={(scrollView) => {this._scrollView = scrollView}}
      pagingEnabled={true}
      horizontal={true}
      contentOffset={{x: this.state.size.width * this._selectedPage, y: 0}}
      onLayout={this._layoutChanged.bind(this)}
      onScroll={this._onScroll.bind(this)}
      scrollEventThrottle={16}
      onScrollBeginDrag={this._onScrollBeginDrag.bind(this)}
      onScrollEndDrag={this._onScrollEndDrag.bind(this)}
      onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this)}
      children={this._childrenWithOverridenStyle()}
    />
  }
  _scrollToPage(selectedPage: number, animated: bool) {
    if(selectedPage < 0 || selectedPage >= this.props.children.length) return;

    this._scrollView.scrollTo({
      animated: animated,
      x: this.state.size.width  * selectedPage
    })
  }
  _onScroll(event) {
    if(this.props.onScroll) {
      this.props.onScroll(event);
    }
    if(this.props.onPageScroll) {
      var page = Math.floor(event.nativeEvent.contentOffset.x / this.state.size.width);
      var offset = event.nativeEvent.contentOffset.x / this.state.size.width - page;
      event.nativeEvent = {position: page, offset: offset};
      this.props.onPageScroll(event);
    }
  }
  _onScrollBeginDrag(event) {
    if(this.props.onScrollBeginDrag) {
      this.props.onScrollBeginDrag(event);
    }
    if(this.props.onPageScrollStateChanged) {
      this.props.onPageScrollStateChanged('dragging');
    }
  }
  _onScrollEndDrag(event) {
    if(this.props.onScrollEndDrag) {
      this.props.onScrollEndDrag(event);
    }
    if(this.props.onPageScrollStateChanged) {
      this.props.onPageScrollStateChanged('settling');
    }
  }
  _onMomentumScrollEnd(event) {
    if(this.props.onMomentumScrollEnd) {
      this.props.onMomentumScrollEnd(event);
    }
    var page = Math.round(event.nativeEvent.contentOffset.x / this.state.size.width);
    if(this.props.onPageSelected) {
      if(this._selectedPage !== page) {
        this._selectedPage = page;
        event.nativeEvent = {position: page};
        this.props.onPageSelected(event);
      }
    }
    if(this.props.onPageScroll) {
      event.nativeEvent = {position: page, offset: 0};
      this.props.onPageScroll(event);
    }
    if(this.props.onPageScrollStateChanged) {
      this.props.onPageScrollStateChanged('idle');
    }
  }
  _childrenWithOverridenStyle() {
    // Override styles so that each page will fill the parent. Native component
    // will handle positioning of elements, so it's not important to offset
    // them correctly.

    var size = this.state.size;

    return React.Children.map(this.props.children, function(child) {
      if (!child) {
        return null;
      }

      var newProps = {
        ...child.props,
        style: [child.props.style, {
          width: size.width,
          height: size.height,
        }],
        collapsable: false,
      };
      if (child.type &&
          child.type.displayName &&
          (child.type.displayName !== 'RCTView') &&
          (child.type.displayName !== 'View')) {
        console.warn('Each PagedScroll child must be a <View>. Was ' + child.type.displayName);
      }
      return React.createElement(child.type, newProps);
    });
  }

  _layoutChanged(event) {
    var {x, y, width, height} = event.nativeEvent.layout;
    this.setState({
      size: {
        width: width,
        height: height
      }
    });
    if(this.props.onLayout) {
      this.props.onLayout(event);
    }
  }
}
