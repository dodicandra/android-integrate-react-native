import React, {FC} from 'react';

import {StyleSheet, Text, View, ViewStyle} from 'react-native';

interface Props {
  text: string;
  style?: ViewStyle;
}

const TypoGrapy: FC<Props> = ({text, style}) => {
  return (
    <View style={[styles.root, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default TypoGrapy;

const styles = StyleSheet.create({
  text: {
    letterSpacing: 1.2,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 20,
  },
  root: {
    padding: 10,
  },
});
