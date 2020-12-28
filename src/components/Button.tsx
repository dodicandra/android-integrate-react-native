import React, {FC} from 'react';

import {ActivityIndicator, Dimensions, GestureResponderEvent, StyleSheet, Text, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  title: string;
  textSize?: number;
  loading: boolean;
}

const Button: FC<Props> = ({onPress, title, textSize, loading}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.root, {width: width * 0.7}]}>
      {loading ? (
        <ActivityIndicator size={30} color="white" />
      ) : (
        <Text style={[styles.text, {fontSize: textSize}]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  root: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#03ACD2',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    letterSpacing: 1.3,
  },
});
