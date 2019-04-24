Messaging

1. INIT RSA OBJECT:
    crypt = new JSEncrypt({default_key_size: 512}) (https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/2.3.1/jsencrypt.min.js)
2. GENERATE KEYS:
    privateKey = crypt.getPrivateKey();
    publicKey = crypt.getPublicKey();
3. EMITING PUBLIC KEY TO SERVER:
    socket.emit('key', JSON.stringify({key: publicKey}));

4. GETTING AES TOKEN AND decrypt them:
            socket.on('message_token', function (data) {
                const keyData = JSON.parse(data);
                const decrypt = new JSEncrypt({default_key_size: 512});
                decrypt.setPrivateKey(privateKey);
                messageToken = decrypt.decrypt(keyData.token);
            });

5. Encrypt and send private message:
            const encrypted = CryptoJS.AES.encrypt(message, messageToken);
            const data = JSON.stringify({
                to: user,
                message: encrypted.toString()
            });
            socket.emit('private_message', data);
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js

6. Receive and decrypt private_message:
                socket.on('private_message', function (data) {
                    const incoming = JSON.parse(data);
                    const bytes = CryptoJS.AES.decrypt(incoming.message.toString(), messageToken);
                    const encryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
                })
                
                
    emit event 'start_typing' with data {conversationId:'<id_string>'}
    emit event 'finish_typing' with data  {conversationId:'<id_string>'}
    
    on event 'start_typing' receive data {conversationId: <id_string>, user: <id_string>}
    on event 'finish_typing' receive data {conversationId: <id_string>, user: <id_string>}
    
    on event 'message_og_info' with data {conversationId:'<id_string>', messageId: '<id_string>', ogResult: [{<object with og result>]}}# messenger_ts_architecture
