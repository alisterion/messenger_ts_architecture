import {BotService} from '../bot/services';
import {Online} from '../socket';
import {CHAT_EVENTS} from '../socket/socket.enum';
import {SocketUserModel} from '../socket/socket.model';
import {isObject} from '../utils';
import {AESSecurity, ServiceManager} from '../utils';
import {RSASecurity} from '../utils';
import {HistoryService, SystemMessageService} from './';
import {CONVERSATION_EVENTS, MESSAGE_TYPE} from './conversation.enum';
import {ConversationManager} from './conversation.manager';
import {ConversationUserDTO} from './dto';
import {QueueService} from './index';
import {MessageFactory} from './models/message.factory';
import {ConversationService} from './service';
import {MessageService} from './service';

export class ConversationSocketController {
    private readonly socket: any;
    private readonly userId: string;
    private readonly email: string;

    private historyService: HistoryService;
    private conversationService: ConversationService;
    private online: Online;
    private security: RSASecurity;
    private aesSecurity: AESSecurity;
    private botService: BotService;
    private messageService: MessageService;
    private systemMessageService: SystemMessageService;
    private queueService: QueueService;

    constructor(socket: any, manager: ServiceManager) {
        this.socket = socket;
        this.userId = this.socket.request.user.id;
        this.email = this.socket.request.user.email;

        this.historyService = manager.get(HistoryService.name) as HistoryService;
        this.online = manager.get(Online.name) as Online;
        this.conversationService = manager.get(ConversationService.name) as ConversationService;
        this.systemMessageService = manager.get(SystemMessageService.name) as SystemMessageService;
        this.queueService = manager.get(QueueService.name) as QueueService;
        this.messageService = manager.get(MessageService.name) as MessageService;

        manager.register(new BotService(), BotService.name);

        this.botService = manager.get(BotService.name) as BotService;

        this.security = new RSASecurity();
        this.aesSecurity = new AESSecurity(this.socket.request.user.messageToken);

        this.socket.on(CHAT_EVENTS.PRIVATE_MESSAGE, this.message.bind(this));
        this.socket.on(CHAT_EVENTS.CONVERSATION_MESSAGE, this.conversationMessage.bind(this));
        this.socket.on(CHAT_EVENTS.READ_MESSAGE, this.read.bind(this));
        this.socket.on(CHAT_EVENTS.START_TYPING, this.startTyping.bind(this));
        this.socket.on(CHAT_EVENTS.FINISH_TYPING, this.finishTyping.bind(this));
    }

    public async startTyping(data: string) {

    }

    public async finishTyping(data: string) {

    }

    public async read(data: string) {

    }

    public async conversationMessage(data: string) {

    }

    public async message(data: string) {

    }
}
