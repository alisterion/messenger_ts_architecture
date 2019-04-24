import {SignalServer} from '../app';
import {Online} from '../socket';
import {SocketUserModel} from '../socket/socket.model';
import {ConversationUserDTO} from './dto';
import {BaseMessage} from './models/base.message';
import {MessageService} from './service';

export class ConversationManager {
    public readonly instance: any;
    public readonly online: Online;
    public readonly transport: any;
    public readonly messageService: MessageService;

    public get participants() {
        return this.instance.participants.map((x: any) => x.toString());
    }

    constructor(conversation: any, transport: any) {
        this.instance = conversation;
        this.online = SignalServer.serviceManager.get(Online.name);
        this.messageService = SignalServer.serviceManager.get(MessageService.name);
        this.transport = transport;
    }

    public async send(fromId: string, message: BaseMessage) {

    }

    public sendEvent(event: any, data: any) {

    }
}
