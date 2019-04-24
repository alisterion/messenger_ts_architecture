import {expect} from 'chai';
import * as crypto from 'crypto';
import {Online} from '../../socket';
import {AESSecurity, ServiceManager} from '../../utils';
import {ConversationSocketController} from '../conversation.socket.controller';
import {HistoryService, QueueService} from '../index';
import {ConversationService, MessageService} from '../service';
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Conversation', () => {
    let controller: ConversationSocketController;
    const AESKey: string = crypto.randomBytes(16).toString('hex');

    before(async () => {
        console.log('Before all tests');

        const user = {
            email: 'fake@fake.com',
            id: '123',
            messageToken: AESKey,
        };

        const socketMock = {
            request: {
                user,
            },
            log: {
                info: console.log,
            },
            sendEvent: () => {

            },
            sendMessage: () => {

            },
            on: () => {
                // console.log('some');
            },
        };
        const serviceManager = new ServiceManager({});

        serviceManager.register({
            getOneById: async () => {
                return {
                    participants: ['123', '321'],
                    save: async () => {

                    },
                };
            },
        }, ConversationService.name);

        serviceManager.register({
            saveMessage: async () => {
                return {};
            },
        }, HistoryService.name);

        serviceManager.register({
            get: async () => {
                return user;
            },
        }, Online.name);

        serviceManager.register({
            createJob: async () => {
                return {};
            },
        }, QueueService.name);

        serviceManager.register({
            getCountOfUnreadConversation: async (): Promise<any> => {
                return {count: []};
            },
        }, MessageService.name);

        controller = new ConversationSocketController(socketMock, serviceManager);
    });

    beforeEach(async () => {
        console.log('Before each test');
    });

    afterEach(async () => {
        console.log('After each test');
    });

    describe('#sendConversationMessage', () => {
        it('should send text message', async () => {
            const crypt = new AESSecurity(AESKey);
            const data = {
                conversationId: 'someId',
                message: crypt.encrypt('some text'),
                messageTempId: 'someId',
            };

            await controller.conversationMessage(JSON.stringify(data));

        });

    });

});
