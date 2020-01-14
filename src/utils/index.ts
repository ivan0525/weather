import { Platform, StatusBar, NativeModules } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
export default class Utils {
  // 获取状态栏高度
  static getAppBarHeight() {
    let barHeight
    // 安卓平台
    if (Platform.OS === 'android') {
      barHeight = StatusBar.currentHeight
    } else {
      // ios平台通过原生模块来获取状态栏高度
      NativeModules.StatusBarManager.getHeight((statusBarHeight: number) => {
        barHeight = statusBarHeight
      })
    }
    return barHeight
  }
  // 安卓
  static isAndroid() {
    return Platform.OS === 'android'
  }
  // ios
  static isIos() {
    return Platform.OS === 'ios'
  }
  // 定位权限
  static hasLocationPermission() {
    // ios
    if (this.isIos()) {
      Geolocation.getCurrentPosition((location) => console.log(location))
    } else {
      // 安卓
    }
  }
}
