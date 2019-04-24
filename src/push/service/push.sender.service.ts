import * as apn from 'apn';
import * as config from 'config';
import * as FCM from 'fcm-push';
import * as path from 'path';
import * as winston from 'winston';
import {CONVERSATION_EVENTS, MESSAGE_TYPE} from '../../conversation/conversation.enum';
import {CALL_EVENTS, CHAT_EVENTS} from '../../socket/socket.enum';
import {PushService} from './push.service';

export class PushSenderService {
    private static instance: PushSenderService;
    private pushService: PushService;
    private serverKey: string = config.get('fcm.serverKey');
    private fcm: any;
    private disallowedEvents: Set<string> = new Set(['online', 'offline', 'read']);
    private pushCallLifetimeTTL: number = 30;
    private voIpProvider: any;

    private eventsWithoutNotification: Set<string> = new Set([
        CALL_EVENTS.CALL,
        CALL_EVENTS.CANCEL_CALL,
        CALL_EVENTS.STOP_CALLING,
        CALL_EVENTS.CALL_NO_ANSWER,
        CONVERSATION_EVENTS.MESSAGE_OG_INFO,
        CHAT_EVENTS.START_TYPING,
        CHAT_EVENTS.FINISH_TYPING,
    ]);
    private voIpEvents: Set<string> = new Set([
        CALL_EVENTS.CALL,
        CALL_EVENTS.CALL_NO_ANSWER,
        CALL_EVENTS.CANCEL_CALL,
        CALL_EVENTS.STOP_CALLING,
    ]);

    constructor() {
        if (PushSenderService.instance) {
            return PushSenderService.instance;
        }
        this.pushService = new PushService();
        this.fcm = new FCM(this.serverKey);

        const options = {
            cert: path.join(path.dirname(__filename), '../../../../keys/voip.pem'),
            key: path.join(path.dirname(__filename), '../../../../keys/key.pem'),
            production: true,
        };
        this.voIpProvider = new apn.Provider(options);
    }

    public async sendVoIpEvent(event: string, userId: string, eventData: any) {

    }

    public async sendEvent(event: string, userId: string, eventData: any) {

    }

    public async send(userId: string, msgData: any) {

    }

    private async sendPush(message: any) {
        try {
            return this.fcm.send(message);
        } catch (e) {
            winston.error(e.message);
        }
    }

    private async getVoIpTokens(userId: string) {

    }

    private async getTokens(userId: string) {

    }

    private buildMessage(event: string, eventData: any) {

    }
}
