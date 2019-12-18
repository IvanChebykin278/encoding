import { ENCRYPT_MESSAGE, DECRYPT_MESSAGE } from "./types";
import { encrypt } from "../modules/encryption";
import { decrypt } from "../modules/decryption";

export const encryptMessage = (message, shift, alphbet) => dispath => {
    dispath({
        type: ENCRYPT_MESSAGE,
        payload: encrypt(message, shift, alphbet)
    });
};

export const decryptMessage = (message, alphbet) => dispath => {
    dispath({
        type: DECRYPT_MESSAGE,
        payload: decrypt(message, alphbet)
    });
}; 