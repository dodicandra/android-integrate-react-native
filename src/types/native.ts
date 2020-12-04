import 'react-native';

export interface getUserId {
  getConstants: () => string;
  getId: () => string;
  getData: (name: string, calback: (d: string) => void) => any;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    getUserId: getUserId;
  }
}
