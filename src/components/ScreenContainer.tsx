import React, {memo} from 'react';

import {StatusBar, View} from 'react-native';

function ScreenContainer<P = {}>(color?: string) {
  return function <S = P>(Component: React.ComponentType<S>) {
    return memo((props: S) => (
      <View style={{flex: 1}}>
        <StatusBar
          animated
          backgroundColor={color}
          hidden={color?.length ? false : true}
          barStyle="dark-content"
          showHideTransition="slide"
        />
        <Component {...props} />
      </View>
    ));
  };
}

export default ScreenContainer;
