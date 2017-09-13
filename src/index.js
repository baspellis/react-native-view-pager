import { Platform } from "react-native";
import ViewPagerIOS from "./index.ios.js";
import ViewPagerAndroid from "./index.android.js";

const ViewPager = Platform.OS === "ios"
  ? ViewPagerIOS
  : ViewPagerAndroid;

export default ViewPager;