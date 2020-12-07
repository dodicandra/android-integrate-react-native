import 'react-native';
import 'react-native-image-crop-picker';

import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export interface getUserId {
  getConstants: () => string;
  getId: () => string;
  getData: (name: string, calback: (d: string) => void) => any;
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
  interface ImageVideoCommon {
    /**
     * Selected image location. This is null when the `writeTempFile` option is set to `false`.
     */
    path: string;

    /**
     * Selected image size in bytes.
     */
    size: number;

    /**
     * Selected image/video width.
     */
    width: number;

    /**
     * Selected image/video height.
     */
    height: number;

    /**
     * Selected image MIME type (image/jpeg, image/png, etc).
     */
    mime: string;

    /**
     * Extracted exif data from image. Response format is platform specific.
     */
    exif?: null | object;

    /**
     * Selected image's localidentifier, used for PHAsset searching.
     *
     * @platform iOS only
     */
    localIdentifier?: string;

    /**
     * Selected image's source path, do not have write access.
     *
     * @platform iOS only
     */
    sourceURL?: string;

    /**
     * Selected image/video's filename.
     *
     * @platform iOS only
     */
    filename?: string;

    /**
     * UNIX timestamp when image was created.
     *
     * @platform iOS only
     */
    creationDate?: string;

    /**
     * UNIX timestamp when image was last modified.
     */
    modificationDate?: string;
  }
  interface Video extends ImageVideoCommon {
    duration: number | null;
    data: string;
  }
  type ImageOrVideo = Image | Video;
}

declare global {
  type ImageScreenProps = CompositeNavigationProp<StackNavigationProp<StackChat, 'Image'>>;
}
