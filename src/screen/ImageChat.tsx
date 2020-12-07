import React, {FC} from 'react';

import {Image, StyleSheet, View} from 'react-native';

import {StackScreenProps} from '@react-navigation/stack';

type ImageScren = StackScreenProps<StackChat<any, any, {image: string}>, 'Image'>;

interface Props extends ImageScren {}

const ImageChat: FC<Props> = ({route}) => {
  const param = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={{uri: param?.image}} resizeMode="contain" style={{width: '100%', height: '100%'}} />
    </View>
  );
};

export default ImageChat;

const styles = StyleSheet.create({});
