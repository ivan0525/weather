import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  TouchableOpacity
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import ContentArea from './../../widget/ContentArea'
import Utils from '../../utils/index'
import { getNowWeather } from './../../api'
import WeatherIcon from '../../components/WeatherIcon'
export interface Istate {
  [key: string]: any
}
export interface Iprops {
  [key: string]: any
}
export default class Home extends Component<Iprops, Istate> {
  state: Istate = {
    basic: {},
    now: {},
    location: {}
  }
  componentDidMount() {
    this.getPosition()
  }
  async requestData() {
    try {
      const { longitude, latitude } = this.state.location
      const { data } = await getNowWeather({
        location: `${longitude},${latitude}`
      })
      const { basic, now } = data.HeWeather6[0]
      this.setState({
        basic,
        now
      })
    } catch (err) {
      console.log(err)
    }
  }

  // 获取当前位置
  async getPosition() {
    try {
      const granted = await Utils.requestLocationPermission()
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (location) => {
            this.setState({
              location: location.coords
            })
            this.requestData()
            console.log(location)
          },
          (err) => {
            console.log(err)
          },
          {
            enableHighAccuracy: true,
            timeout: 5000
          }
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { navigation } = this.props
    const { basic, now } = this.state
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f0f5e5'
        }}
      >
        <ContentArea style={{ flex: 1, alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCity')}
              activeOpacity={1}
            >
              <MaterialCommunityIcon name="menu" size={25} color="#444" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              activeOpacity={1}
            >
              <MaterialCommunityIcon
                name="settings-outline"
                size={25}
                color="#444"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.cityName}>
            <Text style={styles.cityNameText}>{basic.location}</Text>
          </View>
          <WeatherIcon code={now.cond_code} />
          <View>
            <Text style={{ fontSize: 40, color: '#555' }}>{now.tmp}℃</Text>
          </View>
        </ContentArea>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 10,
    width: '100%'
  },
  cityName: {
    width: '100%',
    marginTop: 50
  },
  cityNameText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#555'
  }
})
