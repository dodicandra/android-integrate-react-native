import 'react-native';
import 'react-native-image-crop-picker';

export interface getUserId {
  getConstants: () => string;
  getId: () => string;
  getData: (name: string, calback: (d: string) => void) => any;
  getDataFromInput: (calllback: (data) => string) => void;
}

export interface RNClip {
  getString(): Promise<string>;
  setString(content: string);
  hasString();
  hasURL();
}

declare module 'react-native' {
  interface NativeModulesStatic {
    getUserId: getUserId;
    RNCClipboard: RNClip;
  }
}

declare module 'react-native-image-crop-picker' {
  interface Video extends ImageVideoCommon {
    duration: number | null;
    data: string;
  }
}
