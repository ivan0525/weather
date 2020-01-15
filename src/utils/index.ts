import {
  Platform,
  StatusBar,
  NativeModules,
  PermissionsAndroid
} from 'react-native'

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
}
