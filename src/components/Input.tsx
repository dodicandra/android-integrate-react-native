import React, {FC} from 'react';

import {
  useWindowDimensions, Dimensions, GestureResponderEvent,
  Image, StyleSheet, Text,
  TextInput, TouchableOpacity, View
} from 'react-native';

const {width, height} = Dimensions.get('window');

const send = require('../assets/send-email.png');
const image = require('../assets/insert-picture-icon.png');

interface Props {
  onSend?: (event: GestureResponderEvent) => void;
  onType?: (text: string) => void;
  value?: string;
  disable?: boolean;
  onSendImage?: (event: GestureResponderEvent) => void;
  imageChat?: string;
  onImageCancel?: (event: GestureResponderEvent) => void;
}

const rasio = width * 0.1;

const Input: FC<Props> = ({onSend, onType, value, disable, onSendImage, imageChat, onImageCancel}) => {
  const {width} = useWindowDimensions();
  return (
    <View style={{flexDirection: 'column', marginBottom: 10}}>
      {imageChat?.length ? (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{uri: `data:image/jpeg;base64,${imageChat}`}}
            style={{width: 50, height: 50, borderRadius: 8, marginLeft: 16, marginBottom: 9}}
          />
          <TouchableOpacity onPress={onImageCancel} style={{position: 'absolute', right: 16, alignSelf: 'center'}}>
            <Text style={{fontSize: 18, color: '#1d81de'}}>Batal</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={[styles.root, {width}]}>
        <TextInput
          onChangeText={onType}
          placeholderTextColor="#dedede"
          multiline
          placeholder="Tulis Pesan..."
          style={styles.input}
          value={value}
        />
        {disable ? (
          <TouchableOpacity
            onPress={onSendImage}
            style={[styles.btn, {justifyContent: 'center', alignItems: 'center'}]}
          >
            <Image source={image} resizeMode="stretch" style={{width: 35, height: 35}} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onSend} style={[styles.btn, {justifyContent: 'center', alignItems: 'center'}]}>
            <Image source={send} resizeMode="stretch" style={{width: 35, height: 35}} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    maxHeight: height * 0.13,
    padding: 5,
  },
  input: {
    borderRadius: 6,
    minHeight: height * 0.07,
    borderWidth: 1,
    borderColor: '#dedede',
    flex: 2,
    fontSize: 15,
    marginRight: 8,
  },
  btn: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    height: 50,
    width: 50,
    borderRadius: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
});
