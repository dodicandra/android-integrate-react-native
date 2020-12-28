import React from 'react';

import {Modal as RNModal, ModalProps as RNModalProps, View} from 'react-native';

interface ModalProps extends RNModalProps {}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <RNModal animationType="slide" transparent {...props}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(250,250,250,.5)'}}>
        {props.children}
      </View>
    </RNModal>
  );
};
export default Modal;
