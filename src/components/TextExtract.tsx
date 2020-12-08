import React, {useCallback, FC} from 'react';

import {Linking, StyleProp, StyleSheet, TextStyle} from 'react-native';
import ParsedText from 'react-native-parsed-text';

interface Props {
  style?: StyleProp<TextStyle>;
  curenuser: boolean;
}

const URL_PATTERN = /^www\./i;

const TextExtract: FC<Props> = ({children, style, curenuser}) => {
  const onPresLink = useCallback((url: string) => {
    if (URL_PATTERN.test(url)) {
      onPresLink(`http://${url}`);
    } else {
      Linking.canOpenURL(url)
        .then((supported) => {
          if (!supported) {
            console.error('No handler for URL:', url);
          } else {
            Linking.openURL(url);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const onMail = useCallback(async (mail: string) => {
    try {
      await Linking.openURL(`mailto:${mail}`);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <ParsedText
      style={style}
      parse={[
        {
          type: 'url',
          style: {textDecorationLine: 'underline', color: curenuser ? '#40b6ff' : '#184561'},
          onPress: onPresLink,
        },
        {
          type: 'email',
          onPress: onMail,
          style: {textDecorationLine: 'underline', color: curenuser ? '#40b6ff' : '#184561'},
        },
      ]}
    >
      {children}
    </ParsedText>
  );
};

export default TextExtract;

const styles = StyleSheet.create({});
