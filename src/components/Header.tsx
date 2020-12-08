import React, {memo, useState, FC} from 'react';

import {useWindowDimensions, Dimensions, Image, NativeModules, StyleSheet, Text, View} from 'react-native';

const bons = require('../assets/LOGOWP.webp');
const kustumer = require('../assets/headphones.png');

const {getUserId} = NativeModules;
const {height} = Dimensions.get('window');

interface Props {
  name?: string;
}

const Header: FC<Props> = ({name}) => {
  const {width} = useWindowDimensions();
  const [state, setState] = useState('');

  return (
    <View style={[styles.root, {width}]}>
      <Image source={kustumer} style={{width: 35, height: 35, marginLeft: 20}} />
      <Text style={styles.text}>Bons Indonesia</Text>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#03ACD2',
    height: height * 0.1,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 1.2,
    color: 'white',
    marginLeft: 18,
    fontWeight: '700',
  },
});
