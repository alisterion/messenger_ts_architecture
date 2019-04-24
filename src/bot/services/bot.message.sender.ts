import {PushSenderService} from '../../push';
import {Online} from '../../socket';
import {CHAT_EVENTS} from '../../socket/socket.enum';
import {AESSecurity} from '../../utils';

export class BotMessageSender {
    private online: Online;
    private socket: any;
    private aesSecurity: AESSecurity;

    constructor(socket: any) {
        this.online = new Online();
        this.aesSecurity = new AESSecurity();
        this.socket = socket;
    }

    public async send(userId: string, msgData: any) {

    }
}
