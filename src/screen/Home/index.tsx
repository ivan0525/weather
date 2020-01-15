import React, { Component } from 'react'
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Utils from '../../utils/index'
import { getNowWeather } from './../../api'
import LinearGradient from 'react-native-linear-gradient'
export interface Istate {
  [key: string]: any
}
export default class Home extends Component<Istate> {
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
      console.log(this.state)
      // const { longitude, latitude } = this.state.location
      const { data } = await getNowWeather({
        // location: `${longitude},${latitude}`
        location: 'shenzhen'
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
    console.log(this.state)
    const { basic, now } = this.state
    return (
      <LinearGradient
        colors={['#464e96', '#547ea9', '#409aaf']}
        style={{
          flex: 1
        }}
      >
        <View style={styles.homeContainer}>
          <View style={styles.cityName}>
            <Text style={styles.cityNameText}>{basic.location}</Text>
          </View>
          <Icon name="weather-sunny" style={{ fontSize: 50 }} color="white" />
          <View>
            <Text style={{ fontSize: 40, color: 'white' }}>{now.tmp}℃</Text>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: Utils.getAppBarHeight()
  },
  cityName: {
    width: '100%',
    marginTop: 50
  },
  cityNameText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  }
})
