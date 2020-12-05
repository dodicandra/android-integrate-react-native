import AsycnStorage from '@react-native-async-storage/async-storage';

export async function setToLocal(key: string, val?: string) {
  try {
    const value = JSON.stringify(val);
    await AsycnStorage.setItem(key, value);
    return;
  } catch (err) {
    console.log(err);
  }
}
export async function getToLocal(key: string) {
  try {
    const res = await AsycnStorage.getItem(key);
    return JSON.parse(res as string);
  } catch (err) {
    console.log(err);
  }
}
