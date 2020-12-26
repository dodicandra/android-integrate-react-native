import ImagePicker from 'react-native-image-crop-picker';

export async function PickImage() {
  try {
    const result = await ImagePicker.openPicker({includeBase64: true, compressImageQuality: 0.5});
    return result;
  } catch (err) {
    throw err;
  }
}
