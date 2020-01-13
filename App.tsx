import React, { FC, useState, useEffect } from 'react'
import {
  View,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  Platform,
  StatusBar
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import IconFont from './src/components/Icon'
import Geolocation from 'react-native-geolocation-service'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import WeatherIcon from './src/components/WeatherIcon'
const App: FC = () => {
  const [weatherInfo, setWeatherInfo] = useState({ info: {} })
  const [locationInfo, setLocationInfo] = useState({})
  // ios平台
  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition((location) => console.log(location))
  } else {
    // 安卓平台
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: '允许Free天气访问您当前位置？',
            message: 'Free天气需要获取你的当前位置，这样才能获取当地的天气',
            buttonNeutral: '稍后询问',
            buttonNegative: '取消',
            buttonPositive: '确定'
          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition((location) => console.log(location))
          console.log('定位授权成功')
        } else {
          console.log('定位授权失败')
        }
      } catch (err) {
        console.warn(err)
      }
    }
    // 检查是否已经获得定位权限
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
      .then((isGranted) => {
        if (isGranted) {
          Geolocation.getCurrentPosition(
            (location) => {
              console.log(location)
              // setLocationInfo(location.coords);
            },
            (error) => {
              console.log(error)
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
          )
        } else {
          requestLocationPermission()
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        'https://free-api.heweather.net/s6/weather/now?location=beijing&key=67bfac752701474db805c55652b12a83'
      )
      setWeatherInfo(data)
    }
    getData()
  }, [])
  console.log(weatherInfo)

  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <>
      <LinearGradient
        colors={['#464e96', '#547ea9', '#409aaf']}
        style={{
          flex: 1
        }}
      >
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <SafeAreaView>
          <View>
            <IconFont name="search" size={40} color="#e5e5e5" />
            <Text>hahahh</Text>
            <WeatherIcon code="100n" />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  )
}

export default App
