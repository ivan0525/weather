import React, { Component } from 'react'
import { View, Text } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
export default class Account extends Component {
  static navigationOptions = {
    drawerLabel: '个人中心',
    drawerIcon: () => <MaterialCommunityIcon name="account" size={20} />
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: 30 }}>
        <Text>asdasdasdsadas</Text>
      </View>
    )
  }
}
