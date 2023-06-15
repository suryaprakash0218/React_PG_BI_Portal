import cryptoJs from 'crypto-js';

const encryptionKey = 'TransactionAnalystsBIPortal'; // replace with your own secret key

export const encryptData = (data) => {
  const encryptedData = cryptoJs.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return encryptedData;
};

export const decryptData = (encryptedData) => {
  const decryptedData = cryptoJs.AES.decrypt(encryptedData, encryptionKey).toString(cryptoJs.enc.Utf8);
  return JSON.parse(decryptedData);
};
