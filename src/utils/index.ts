import {
  Platform,
  StatusBar,
  NativeModules,
  PermissionsAndroid,
  Permission
} from 'react-native'

import Geolocation from '@react-native-community/geolocation'
export default class Utils {
  // 获取状态栏高度
  static getAppBarHeight(): number | undefined {
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
  static isAndroid(): boolean {
    return Platform.OS === 'android'
  }

  // ios
  static isIos(): boolean {
    return Platform.OS === 'ios'
  }

  // 安卓请求定位权限
  static requestLocationPermission() {
    return PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
  }

  // 获取位置信息
  static getLocationInfo() {
    let locationInfo
    // ios
    if (this.isIos()) {
      Geolocation.getCurrentPosition((location) => {
        locationInfo = location
      })
    } else {
      // 安卓
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '允许Free天气访问您当前位置？',
          message: 'Free天气需要获取你的当前位置，这样才能获取当地的天气',
          buttonNeutral: '稍后询问',
          buttonNegative: '取消',
          buttonPositive: '确定'
        }
      )
        .then((granted) => {
          console.log(granted)
          // 已经授权
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('定位授权成功')
            Geolocation.getCurrentPosition((location) => {
              locationInfo = location
            })
          } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.log('重新获取权限')
          } else {
            console.log('永久拒绝，不再询问授权')
          }
        })
        .catch((err) => {
          console.warn(err)
        })
    }
    return locationInfo
  }
}
