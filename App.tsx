import React, { FC, useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  PermissionsAndroid,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from './src/components/Icon';
import Geolocation from '@react-native-community/geolocation';
const myIcon = <Icon name="rocket" size={30} color="#900" />;
import axios from 'axios';
const App: FC = () => {
  const [weatherInfo, setWeatherInfo] = useState({ info: {} });
  // ios平台
  if (Platform.OS === 'ios') {
    Geolocation.getCurrentPosition(info => console.log(info));
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
        );
        console.log(granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('定位授权成功');
        } else {
          console.log('定位授权失败');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestLocationPermission();
  }

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        'https://free-api.heweather.net/s6/weather/now?location=beijing&key=67bfac752701474db805c55652b12a83'
      );
      console.log(data);
      setWeatherInfo(data);
    };
    getData();
  }, []);
  console.log(weatherInfo);
  return (
    <SafeAreaView>
      <View>
        {myIcon}
        <IconFont name="search" size={40} color="#e5e5e5" />
        <Text>hahahh</Text>
      </View>
    </SafeAreaView>
  );
};

export default App;
