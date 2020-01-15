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
import LinearGradient from 'react-native-linear-gradient'
import Utils from '../../utils/index'
import { getNowWeather } from './../../api'
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
    const { navigation } = this.props
    const { basic, now } = this.state
    return (
      <LinearGradient
        colors={['#464e96', '#547ea9', '#409aaf']}
        style={{
          flex: 1
        }}
      >
        <ContentArea style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddCity')}
              activeOpacity={1}
            >
              <MaterialCommunityIcon name="menu" size={25} color="#e5e5e5" />
            </TouchableOpacity>
            <MaterialCommunityIcon name="share" size={25} color="#e5e5e5" />
          </View>
          <View style={styles.cityName}>
            <Text style={styles.cityNameText}>{basic.location}</Text>
          </View>
          <MaterialCommunityIcon
            name="weather-sunny"
            style={{ fontSize: 50 }}
            color="white"
          />
          <View>
            <Text style={{ fontSize: 40, color: 'white' }}>{now.tmp}℃</Text>
          </View>
        </ContentArea>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    width: '100%'
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
