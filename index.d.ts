/// <reference types="node" />

type StackChat<C = object, L = object> = {
  Chat: C | undefined;
  Login: L | undefined;
};
