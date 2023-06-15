import Cookies from 'js-cookie';
import { decryptData, encryptData } from 'src/encryption/EncryptDecript';

export const setCookies = (key, obj) => {
  try {
    Cookies.set(key, encryptData(obj), {
      expires: 2147483647,
    });
  } catch (err) {}
};

export const getCookies = (key, defaultValue) => {
  try {
    const serializableState = Cookies.get(key);

    console.log('cookies data', serializableState);

    if (serializableState === null) {
      return defaultValue;
    }

    // const stateData = JSON.parse(serializableState);

    return decryptData(serializableState);
  } catch (error) {
    return defaultValue;
  }
};
