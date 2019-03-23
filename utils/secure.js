"use strict";
const crypto = require("crypto");

const SALT_LENGTH = 64; // Length of the salt, in bytes
const TOKEN_LENGTH = 64;
const HASH_LENGTH = 64; // Length of the hash, in bytes
const HASH_ITERATIONS = 1000; // Number of pbkdf2 iterations
const IV_LENGTH = 16; // For AES, this is always 16

function generateToken() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(TOKEN_LENGTH, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

function generateSalt() {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(SALT_LENGTH, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
}

function hash(data, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(data, salt, HASH_ITERATIONS, HASH_LENGTH, "sha1", (err, hash) => {
      if (err) {
        reject(err);
      }
      resolve({
        salt: salt,
        hash: hash
      });
    });
  });
}

function saltAndHash(data) {
  return generateSalt().then(salt => {
    return hash(data, salt);
  });
}

function encrypt(text, ENCRYPTION_KEY) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let encrypted = cipher.update(text);

  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString("hex") + ":" + encrypted.toString("hex");
}

function decrypt(text, ENCRYPTION_KEY) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = {
  encrypt,
  decrypt,
  generateSalt,
  generateToken,
  hash,
  saltAndHash
};
