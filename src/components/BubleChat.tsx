import React, {memo} from 'react';

import dayjs from 'dayjs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ChildProps} from './Chat';
import TextExtract from './TextExtract';

const check = require('../assets/check.png');

export const BubleChat = memo(({curenuser, onPress, width, chat}: ChildProps) => {
  const date = dayjs(chat.createdAt).format('DD/MM/YY');
  const align = curenuser ? 'flex-end' : 'flex-start';
  let colorDate = curenuser ? '#dedede' : 'white';
  let colorText = curenuser ? 'black' : 'white';
  let colorBackground = curenuser ? 'white' : '#03ACD2';
  return (
    <View
      accessible
      style={[
        styles.container,
        {
          alignSelf: align,
          borderBottomLeftRadius: curenuser ? 9 : 0,
          borderBottomRightRadius: curenuser ? 0 : 9,
          backgroundColor: colorBackground,
          maxWidth: width * 0.8,
        },
      ]}
    >
      <TouchableOpacity delayLongPress={300} onLongPress={onPress}>
        <TextExtract curenuser={curenuser} style={[styles.hello, {color: colorText}]}>
          {chat.content}
        </TextExtract>
        <View style={[styles.check, {alignSelf: align}]}>
          <Text style={{color: colorDate, fontSize: 10}}>{dayjs(chat.createdAt).format('HH:mm')}</Text>
          {curenuser ? (
            <Image source={check} resizeMode="contain" style={{width: 10, marginLeft: 20, height: 10}} />
          ) : null}
        </View>
      </TouchableOpacity>
      <Text style={[styles.date, {alignSelf: align}]}>{date}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 9,
    marginVertical: 7,
    elevation: 1,
    paddingHorizontal: 7,
    paddingVertical: 5,
    marginBottom: 20,
  },
  hello: {
    fontSize: 13,
    letterSpacing: 1.2,
    lineHeight: 18,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
  date: {color: '#404040', position: 'absolute', fontSize: 8, bottom: -15},
  check: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
