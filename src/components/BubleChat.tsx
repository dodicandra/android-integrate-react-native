import React, {memo} from 'react';

import dayjs from 'dayjs';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {ChildProps} from './Chat';

const check = require('../assets/check.png');

export const BubleChat = memo(({curenuser, onPress, width, chat}: ChildProps) => {
  const date = dayjs(chat.createdAt).format('DD/MM/YY');
  return (
    <View
      accessible
      style={[
        styles.container,
        {
          paddingVertical: 9,
          alignSelf: !curenuser ? 'flex-start' : 'flex-end',
          borderBottomLeftRadius: !curenuser ? 0 : 9,
          borderBottomRightRadius: curenuser ? 0 : 9,
          backgroundColor: !curenuser ? '#03ACD2' : 'white',
          maxWidth: width * 0.8,
        },
      ]}
    >
      <TouchableOpacity delayLongPress={500} onLongPress={onPress}>
        <Text accessible style={[styles.hello, {color: !curenuser ? 'white' : 'black'}]}>
          {chat.content}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: curenuser ? 'flex-end' : 'flex-start'}}>
          <Text style={{color: !curenuser ? 'white' : '#dedede', fontSize: 10}}>
            {dayjs(chat.createdAt).format('HH:mm')}
          </Text>
          {curenuser ? (
            <Image source={check} resizeMode="contain" style={{width: 10, marginLeft: 20, height: 10}} />
          ) : null}
        </View>
      </TouchableOpacity>
      <Text style={[styles.date, {alignSelf: !curenuser ? 'flex-start' : 'flex-end'}]}>{date}</Text>
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
    paddingVertical: 4,
  },
  hello: {
    fontSize: 17,
    letterSpacing: 1.2,
    lineHeight: 18,
    textAlign: 'left',
    margin: 10,
    color: 'black',
  },
  date: {color: '#404040', position: 'absolute', fontSize: 8, bottom: -15},
});
