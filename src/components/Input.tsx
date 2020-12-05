import React from 'react';

import {Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const {width, height} = Dimensions.get('window');

interface Props {}

const rasio = width * 0.1;

const Input = (props: Props) => {
  return (
    <View style={styles.root}>
      <TextInput placeholderTextColor="grey" multiline placeholder="Tulis Pesan..." style={styles.input} />
      <TouchableOpacity style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.btn}>
          <Text style={{color: 'white'}}>send</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    width,
    maxHeight: height * 0.13,
    padding: 5,
    marginBottom: 10,
  },
  input: {
    borderRadius: 6,
    minHeight: height * 0.07,
    borderWidth: 1,
    borderColor: 'grey',
    flex: 2,
  },
  btn: {
    backgroundColor: 'blue',
    marginHorizontal: 5,
    height: rasio,
    width: rasio,
    borderRadius: rasio / 2,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
