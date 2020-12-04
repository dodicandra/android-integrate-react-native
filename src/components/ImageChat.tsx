import React, {FC, memo} from 'react';

import {Dimensions, Image, ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';

const {width} = Dimensions.get('window');

interface Props {
  src: ImageSourcePropType;
}

const ImageChat: FC<Props> = ({src}) => {
  return (
    <TouchableOpacity>
      <Image style={styles.image} source={src} resizeMode="stretch" />
    </TouchableOpacity>
  );
};

export default memo(ImageChat);

const styles = StyleSheet.create({
  image: {
    width: width * 0.2,
    height: width * 0.3,
  },
});
