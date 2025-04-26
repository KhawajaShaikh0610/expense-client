import CryptoJS from "crypto-js";

// Encrypt
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.REACT_APP_ENCRYPT_SECRET_KEY
  ).toString();
};

// Decrypt
export const decryptData = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(
    cipherText,
    process.env.REACT_APP_ENCRYPT_SECRET_KEY
  );
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
