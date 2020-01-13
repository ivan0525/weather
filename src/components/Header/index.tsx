import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
interface Props {
  renderLeft?: () => JSX.Element
  renderRight?: () => JSX.Element
  renderTitle?: () => JSX.Element
  navigation: any
  style?: any
  color?: string
  primary?: boolean
  transparent?: boolean
}
function Header(props: Props) {
  const {
    renderLeft,
    renderRight,
    renderTitle,
    navigation,
    transparent,
    primary,
    color,
    style,
    ...toherProps
  } = props
  const headerStyle = [
    styles.defaultHeaderStyle,
    transparent && styles.transparent,
    primary && styles.primary,
    style
  ]
  return (
    <View style={headerStyle} {...toherProps}>
      {renderLeft ? (
        renderLeft()
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.goBack(null)}
        >
          <Text
            style={{
              fontFamily: 'iconfont',
              fontSize: 22,
              color: color || '#fff'
            }}
          >
            &#xe618;
          </Text>
        </TouchableOpacity>
      )}
      {renderTitle ? renderTitle() : null}
      {renderRight ? renderRight() : null}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  defaultHeaderStyle: {
    height: 50,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  primary: {
    backgroundColor: '#e60026'
  },
  transparent: {
    backgroundColor: 'rgba(255 ,255,255,0)'
  }
})
