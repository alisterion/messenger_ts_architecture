import {PushSenderService} from '../../push';
import {AESSecurity} from '../../utils';
import {CHAT_EVENTS} from '../socket.enum';
import {Online} from './online.socket.service';

export class UserMessageSenderService {
    private online: Online;
    private socket: any;
    private aesSecurity: AESSecurity;

    constructor(socket: any) {
        this.online = new Online();
        this.aesSecurity = new AESSecurity();
        this.socket = socket;
    }

    public async sendEvent(event: string, userId: string, eventData: any) {

    }

    public async send(userId: string, msgData: any) {

    }
}
