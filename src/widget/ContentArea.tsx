import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Utils from '../utils'
export interface Iprops {
  [key: string]: any
}
export default class ContentArea extends Component<Iprops> {
  render() {
    const { children, style } = this.props
    const contentAreaStyle = [styles.contentArea, style]
    return <View style={contentAreaStyle}>{children}</View>
  }
}

const styles = StyleSheet.create({
  contentArea: {
    flex: 1,
    marginTop: Utils.getAppBarHeight()
  }
})
