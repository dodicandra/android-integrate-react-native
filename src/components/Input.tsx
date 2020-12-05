import React, {FC} from 'react';

import {Dimensions, GestureResponderEvent, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const {width, height} = Dimensions.get('window');

interface Props {
  onSend?: (event: GestureResponderEvent) => void;
  onType?: (text: string) => void;
  value?: string;
}

const rasio = width * 0.1;

const Input: FC<Props> = ({onSend, onType, value}) => {
  return (
    <View style={styles.root}>
      <TextInput
        onChangeText={onType}
        placeholderTextColor="grey"
        multiline
        placeholder="Tulis Pesan..."
        style={styles.input}
        value={value}
      />
      <TouchableOpacity onPress={onSend} style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
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
