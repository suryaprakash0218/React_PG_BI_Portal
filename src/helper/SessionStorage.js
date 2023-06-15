import { decryptData, encryptData } from 'src/encryption/EncryptDecript';

export const loadState = (key, defaultValue) => {
  try {
    const serializableState = sessionStorage.getItem(key);

    if (serializableState === null) {
      return defaultValue;
    }

    // const stateData = JSON.parse(serializableState);

    return decryptData(serializableState);
  } catch (error) {
    return defaultValue;
  }
};

export const saveState = (key, obj) => {
  try {
    sessionStorage.setItem(key, encryptData(obj));
  } catch (error) {}
};
