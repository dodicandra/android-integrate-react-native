import AsycnStorage from '@react-native-async-storage/async-storage';

type Values = {
  token: string;
  username: string;
};

export async function setToLocal(key: string, val?: Values) {
  try {
    const value = JSON.stringify(val);
    await AsycnStorage.setItem(key, value);
    return;
  } catch (err) {
    console.log(err);
  }
}
export async function getToLocal(key: string): Promise<Values | undefined> {
  try {
    const res = await AsycnStorage.getItem(key);
    return JSON.parse(res as string);
  } catch (err) {
    console.log(err);
  }
}
