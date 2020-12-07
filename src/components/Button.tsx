import React, {FC} from 'react';

import {GestureResponderEvent, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  textSize?: number;
}

const Button: FC<Props> = ({onPress, title, textSize}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.root}>
      <Text style={[styles.text, {fontSize: textSize}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 25,
    backgroundColor: '#03ACD2',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 30,
  },
});
