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
// 防抖函数
export const debounce = (func: Function, wait = 300, immediate = true) => {
  let timer: any
  // 延迟执行函数
  const later = (context: any, args: any) =>
    setTimeout(() => {
      timer = null // 倒计时结束
      if (!immediate) {
        func.apply(context, args)
        //执行回调
        context = args = null
      }
    }, wait)
  let debounced: any = function(this: any, ...params: any) {
    console.log(this, params)
    let context = this
    let args = params
    if (!timer) {
      timer = later(context, args)
      if (immediate) {
        //立即执行
        func.apply(context, args)
      }
    } else {
      clearTimeout(timer)
      //函数在每个等待时延的结束被调用
      timer = later(context, args)
    }
  }
  debounced.cancel = function() {
    clearTimeout(timer)
    timer = null
  }
  return debounced
}
