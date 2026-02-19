import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_AES_DECRYPT_KEY;

export function decryptLink(encrypted) {
    try {
        const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);

        const decrypted = CryptoJS.AES.decrypt(
            {
                ciphertext: CryptoJS.enc.Base64.parse(encrypted),
            },
            key,
            {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7,
            }
        );

        return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.error("Decryption failed", e);
        return null;
    }
}