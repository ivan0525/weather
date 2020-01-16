import React, { FC } from 'react'

import SafeAreaView from 'react-native-safe-area-view'
import { DrawerItems } from 'react-navigation-drawer'
import { ScrollView, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'

const CustomDrawerContent: FC = (props: any) => {
  const translateX = Animated.interpolate(1, {
    inputRange: [0, 1],
    outputRange: [-100, 0]
  })
  return (
    <Animated.View style={{ transform: [{ translateX }] }}>
      <ScrollView>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: 'always', horizontal: 'never' }}
        >
          <DrawerItems {...props} />
        </SafeAreaView>
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default CustomDrawerContent
