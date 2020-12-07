import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type Stack = StackNavigationProp<StackChat<any, any, {image: string}>, 'Image'>;

export type ImageScren = CompositeNavigationProp<Stack, Stack>;
