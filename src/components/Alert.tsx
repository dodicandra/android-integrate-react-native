import React from 'react';

import {Dimensions, GestureResponderEvent, StyleSheet, Text, TouchableHighlight, View} from 'react-native';

const {height} = Dimensions.get('window');

interface AlertComponentProps {
  onPressOk: (event: GestureResponderEvent) => void;
  onPressCancel: () => void;
  loading: boolean;
}

const AlertComponent: React.FC<AlertComponentProps> = ({onPressCancel, onPressOk}) => {
  return (
    <View style={styles.root}>
      <View style={{marginBottom: height * 0.03, width: 200}}>
        <Text style={styles.message}>Hapus pesan dan akhiri sesi?</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableHighlight underlayColor="#eaeaea" onPress={onPressOk} style={styles.ok}>
          <Text style={[styles.text, {color: 'black'}]}>OK</Text>
        </TouchableHighlight>
        <TouchableHighlight underlayColor="#57b8ce" onPress={onPressCancel} style={styles.cancel}>
          <Text style={[styles.text, {color: 'white'}]}>Cancel</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 4,
  },
  cancel: {
    backgroundColor: '#03ACD2',
    paddingVertical: 10,
    borderRadius: 9,
    width: 80,
  },
  ok: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 9,
    borderColor: '#03ACD2',
    borderWidth: 1,
    marginRight: 20,
    width: 80,
  },
  text: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.3,
    textAlign: 'center',
  },
  message: {
    letterSpacing: 1.5,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: '800',
  },
});

export default AlertComponent;
