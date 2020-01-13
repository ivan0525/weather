import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { iconPath } from './iconsPath';
export interface Iprops {
  code: string;
  style?: any;
}

export default class WeatherIcon extends Component<Iprops> {
  constructor(props: Iprops) {
    super(props);
  }
  render() {
    const { code, style } = this.props;
    const imageStyle = [styles.defaultImageStyle, style];
    return <Image style={imageStyle} source={iconPath[code]} />;
  }
}
const styles = StyleSheet.create({
  defaultImageStyle: {
    width: 50,
    height: 50
  }
});
