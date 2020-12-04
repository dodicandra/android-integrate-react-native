import React, {FC, memo, useState} from 'react';

import {Dimensions, NativeModules, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View} from 'react-native';

const {getUserId} = NativeModules;
const {width, height} = Dimensions.get('window');

interface Props {
  name: string;
}

const Header: FC<Props> = ({name}) => {
  const {width} = useWindowDimensions();
  const [state, setState] = useState('');

  getUserId.getData(name, (data) => {
    setState(data);
  });

  return (
    <View style={[styles.root, {width}]}>
      <TouchableOpacity>
        <Text style={styles.text}>Header {state}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'blue',
    height: height * 0.07,
    justifyContent: 'center',
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    letterSpacing: 1.2,
    color: 'white',
  },
});
