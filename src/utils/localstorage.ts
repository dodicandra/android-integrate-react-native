import AsycnStorage from '@react-native-async-storage/async-storage';

type Values = {
  token: string;
  username: string;
};

export async function setToLocal<T = Values>(key: string, val?: T) {
  try {
    const value = JSON.stringify(val);
    await AsycnStorage.setItem(key, value);
    return;
  } catch (err) {
    console.log(err);
  }
}
export async function getToLocal<T = Values>(key: string): Promise<T | undefined> {
  try {
    const res = await AsycnStorage.getItem(key);
    return JSON.parse(res as string);
  } catch (err) {
    console.log(err);
  }
}

export async function removeLocal(item: string) {
  try {
    await AsycnStorage.removeItem(item);
  } catch (err) {
    console.log(err);
  }
}
