import {AppRegistry} from 'react-native';

import messaging from '@react-native-firebase/messaging';

import App from './App';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  return true;
});

AppRegistry.registerComponent('ReactNative', () => App);
