import cryptoJs from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

// DES加密
export const encryptDes = (password) => {
  const keyHex = cryptoJs.enc.Utf8.parse('0123456789abcd0123456789');
  const encrypted = cryptoJs.TripleDES.encrypt(password, keyHex, {
    iv: cryptoJs.enc.Utf8.parse('01234567'),
    mode: cryptoJs.mode.CBC,
    padding: cryptoJs.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
};
// RES加密
export const encryptRes = (password) => {
  const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyooZY8/8OEoEOS/7rYY80iGtYBD6wnZOHlMM87GSkZb / VmtB0ddfGtKEzRe2mfcJ + vUsFtXuMLaT7cw48uLr5vDmy + HMu8V4XEnYIvPWO6JGafMcLg0BBEJQVe7iZY9M6HZ + UwbpleLPPaNAIELH0XSGwNw17iBp7IwyV0mBPvVP7lOmFHCwjoUXRndwoj0Q5 / +nmhe92hYlIY5zBK4419sjFUid52khJBFVX / mtgD7YRqjO / uwEDNUjLOTFstykPZPAQPlgYK2br0TL3Q39n + PfiTFkD6IE1cDWoS170wL7bA + ed3qIvA8xQqSRrSPijXTlHJuVxFnIGqjWTHwipQIDAQAB'; // 从后台获取公钥，这里省略，直接赋值
  const encryptor = new JSEncrypt(); // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey); // 设置公钥
  const rsaPassWord = encryptor.encrypt(password); // 对密码进行加密
  return rsaPassWord;
};
