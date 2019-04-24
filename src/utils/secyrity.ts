import * as JSEncrypt from 'node-jsencrypt';
import * as NodeRsa from 'node-rsa';

export class RSASecurity {
    private key: any;
    private keyLength: number = 512;
    private privateKey: string;
    private publicKey: string;
    private encryptor: any;

    constructor() {
        this.key = new NodeRsa({b: this.keyLength});
        this.key.generateKeyPair(this.keyLength);
        this.encryptor = new JSEncrypt({default_key_size: this.keyLength});

        this.privateKey = this.key.exportKey('pkcs8-private-pem');
        this.publicKey = this.key.exportKey('pkcs8-public-pem');
    }

    public getKeyPair() {
        return {
            privateKey: this.privateKey,
            publicKey: this.publicKey,
        };
    }

    public encrypt(publicKey: string, content: string) {
        this.encryptor.setPublicKey(publicKey);
        return this.encryptor.encrypt(content);
    }

    public decrypt(privateKey: string, content: string) {
        this.encryptor.setPrivateKey(privateKey);
        return this.encryptor.decrypt(content);
    }
}
