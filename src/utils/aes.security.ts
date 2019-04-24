import * as CryptoJS from 'crypto-js';

export class AESSecurity {
    private key: string;

    constructor(key: string = '') {
        this.key = key;
    }

    public setKey(newKey: string) {
        this.key = newKey;
    }

    public encrypt(content: string) {
        const encrypted = CryptoJS.AES.encrypt(content, this.key);
        return encrypted.toString();
    }

    public decrypt(content: string): string {
        if (!content) {
            return '';
        }
        const bytes = CryptoJS.AES.decrypt(content.toString(), this.key);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}
