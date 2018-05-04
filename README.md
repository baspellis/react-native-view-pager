## react-native-view-pager
[![npm version](https://badge.fury.io/js/react-native-view-pager.svg)](https://www.npmjs.com/package/react-native-view-pager)
![react-native platform](https://img.shields.io/badge/platform-ios-blue.svg)
![react-native platform](https://img.shields.io/badge/platform-android-blue.svg)

Platform independent paged ScrollView. Mimics ViewPagerAndroid on iOS.

### Content
- [Installation](#installation)
- [API](#api)
- [Examples](#examples)

### Installation
```bash
npm i react-native-view-pager --save
```

### Usage
```jsx
const ViewPager = require('react-native-view-pager');

or

import ViewPager from 'react-native-view-pager';
```

### API
Props
- **initialPage** - (Integer) - Index of initial page that should be selected. Use setPage method to update the page, and onPageSelected to monitor page changes.
- **onPageScroll** - (Function) - Executed when transitioning between pages (ether because of animation for the requested page change or when user is swiping/dragging between pages) The event.nativeEvent object for this callback will carry following data: - position - index of first page from the left that is currently visible - offset - value from range [0,1] describing stage between page transitions. Value x means that (1 - x) fraction of the page at "position" index is visible, and x fraction of the next page is visible.
- **onPageScrollStateChanged** - (Function) - Function called when the page scrolling state has changed. The page scrolling state can be in 3 states: - idle, meaning there is no interaction with the page scroller happening at the time - dragging, meaning there is currently an interaction with the page scroller - settling, meaning that there was an interaction with the page scroller, and the page scroller is now finishing it's closing or opening animation.
- **onPageSelected** - (Function) - This callback will be called once ViewPager finish navigating to selected page (when user swipes between pages). The event.nativeEvent object passed to this callback will have following fields: - position - index of page that has been selected.

Methods
- **ref.setPage(page: Integer)** - Selects the specified page animated.
- **ref.setPageWithoutAnimation(page: Integer)** - Selects the specified page without animation.

### Example
Simple Calendar example included. See example folder.

### Questions?
Feel free to contact me via
- [Twitter](https://twitter.com/baspellis)

If you want to report a bug, please [submit an issue!](https://github.com/baspellis/react-native-view-pager/issues/new)
