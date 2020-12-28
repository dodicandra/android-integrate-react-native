import React, {memo, useState, FC} from 'react';

import {useWindowDimensions, Dimensions, Image, Modal, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {StackHeaderProps} from '@react-navigation/stack';

const bons = require('../assets/LOGOWP.webp');
const kustumer = require('../assets/headphones.png');
const trash = require('../assets/trash.png');
const {height} = Dimensions.get('window');

interface Props extends StackHeaderProps {
  name?: string;
}

const Header: FC<Props> = ({name}) => {
  const {width} = useWindowDimensions();

  return (
    <View style={[styles.root, {width}]}>
      <View style={{flexDirection: 'row'}}>
        <Image source={kustumer} style={{width: 35, height: 35, marginLeft: 20}} />
        <Text style={styles.text}>Bons Indonesia</Text>
      </View>
      <TouchableOpacity>
        <Image source={trash} resizeMode="contain" style={{width: 35, height: 24, marginRight: 20}} />
      </TouchableOpacity>
    </View>
  );
};

type IHeaderRight = {
  onPress: () => void;
};

type IHeaderLeft = {
  indicator?: boolean;
};

export const HeaderRight = (props: IHeaderRight) => (
  <TouchableOpacity onPress={props.onPress}>
    <Image source={trash} style={{width: 25, height: 25, marginRight: 20}} />
  </TouchableOpacity>
);

export const HeaderLeft = (props: IHeaderLeft) => (
  <View style={[styles.online, {backgroundColor: props.indicator ? '#2bff00' : '#cecece'}]}>
    <Image source={bons} style={{width: 35, height: 35}} />
  </View>
);

export default memo(Header);

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#03ACD2',
    height: height * 0.1,
    borderBottomEndRadius: 12,
    borderBottomStartRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    letterSpacing: 1.2,
    color: 'white',
    marginLeft: 18,
    fontWeight: '700',
  },
  online: {
    padding: 2,
    borderRadius: 100,
    marginLeft: 20,
  },
});
