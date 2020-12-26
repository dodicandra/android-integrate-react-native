/// <reference types="node" />

type StackChat<C = any, L = any, I = any> = {
  Chat: C;
  Login: L;
  Image: I;
};

declare module 'react-native-crypto-js' {
  import crypto from 'crypto-js';
  export default crypto;
}
