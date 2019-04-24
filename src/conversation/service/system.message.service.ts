import {SignalServer} from '../../app';
import {MessageService} from './message.service';
import {MESSAGE_TYPE} from "../conversation.enum";

export class SystemMessageService {
    private static _name: string = 'conversation.system.message.service';

    public readonly messageService: MessageService;

    static get name(): string {
        return this._name;
    }

    constructor() {
        this.messageService = SignalServer.serviceManager.get(MessageService.name);
    }

    public async send(conversationId: string, message: string) {
        await this.messageService.create({
            body: message,
            conversationId,
            type: MESSAGE_TYPE.SYSTEM,
        });
    }
}
