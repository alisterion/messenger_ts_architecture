import * as config from 'config';
import * as crypto from 'crypto';
import * as moment from 'moment';
import * as redisAdapter from 'socket.io-redis';
import * as winston from 'winston';
import {BotMessageSender} from '../bot/services';
import {BotCommandParser} from '../bot/services';
import {AuthService, AuthToken} from '../user/service/user.auth.service';
import {User, UserModel} from '../user/user.model';
import {ServiceManager} from '../utils';
import {Online} from './service/online.socket.service';
import {UserMessageSenderService} from './service/user.message.sender.service';
import {Connection} from './socket.connection';

const middleware = require('socketio-wildcard')();

export {Online} from './service/online.socket.service';

export class SocketManager {
    private authService: AuthService;
    private online: Online;
    private serviceManager: ServiceManager;

    constructor(public io: any, serviceManager: ServiceManager) {
        this.serviceManager = serviceManager;

        this.authService = serviceManager.get('user.auth.service');
        this.online = serviceManager.get('socket.online.service');

        this.io.adapter(redisAdapter(config.get('redis')));
    }

    public async run() {
        winston.info('Running socket manager');
        this.connectLogging();
        this.connectAuth();
        this.connectEncryption();
        this.connectEventManager();
        this.connectBotCommandsParser();
        await this.removeOldConnection();

        this.io.use(middleware);

        this.io.on('connection', async (socket: object) => {
            const userConnection = new Connection(socket, this.io, this.serviceManager);
            await userConnection.connect();
        });

    }

    private async removeOldConnection() {

    }

    private connectAuth() {
        this.io.use(async (socket: any, next: any) => {
            const token = socket.handshake.query.token;
            let verifiedToken: AuthToken;
            try {
                verifiedToken = await this.authService.verifyToken(token);
            } catch (e) {
                socket.disconnect('unauthorized');
                next(new Error());
            }

            if (!verifiedToken) {
                socket.disconnect('unauthorized');
                return next(new Error('Wrong token'));
            }

            const user = await User.findById(verifiedToken.id) as UserModel;
            if (!user) {
                socket.disconnect('unauthorized');
                next(new Error());
            } else {
                socket.request.user = user.toJSON();
                next();
            }

        });
    }

    private connectEncryption() {
        this.io.use(async (socket: any, next: any) => {
            if (socket.request.user) {
                socket.request.user.messageToken = crypto.randomBytes(16).toString('hex');
            }
            next();
        });
    }

    private connectEventManager() {
        this.io.use(async (socket: any, next: any) => {
            const sender = new UserMessageSenderService(socket);
            const botSender = new BotMessageSender(socket);
            socket.sendMessage = sender.send.bind(sender);
            socket.sendEvent = sender.sendEvent.bind(sender);
            socket.sendMessageFromBot = botSender.send.bind(sender);
            next();
        });
    }

    private connectBotCommandsParser() {
        const parser = new BotCommandParser();
        this.io.use(async (socket: any, next: any) => {
            socket.parseBotCommand = parser.parse.bind(parser);
            next();
        });
    }

    private connectLogging() {
        this.io.use(async (socket: any, next: any) => {
            next();
        });
    }
}
