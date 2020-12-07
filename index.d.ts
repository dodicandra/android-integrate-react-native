/// <reference types="node" />

type StackChat<C = object, L = object, I = object> = {
  Chat: C | undefined;
  Login: L | undefined;
  Image: I | undefined;
};
