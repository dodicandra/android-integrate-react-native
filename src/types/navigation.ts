import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type Stack = StackNavigationProp<StackChat<any, any, {image: string}>, 'Image'>;

export type StackHome = StackScreenProps<StackChat, 'Chat'>;

export type ImageScren = CompositeNavigationProp<Stack, Stack>;
