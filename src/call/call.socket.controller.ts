import {ConversationService, HistoryService} from '../conversation';
import {Online} from '../socket';
import {CALL_EVENTS} from '../socket/socket.enum';
import {SocketUserModel} from '../socket/socket.model';
import {AuthService} from '../user/service/user.auth.service';
import {ServiceManager} from '../utils';
import {CallUserDTO} from './dto/call.user.dto';
import {CallControlService} from './service/call.controll.service';
import {CallService} from './service/call.service';

export class CallSocketController {
    private socket: any;
    private readonly userId: string;
    private readonly email: string;

    private authService: AuthService;
    private online: Online;
    private callControlService: CallControlService;
    private callService: CallService;
    private conversationService: ConversationService;
    private historyService: HistoryService;

    constructor(socket: any, manager: ServiceManager) {
        this.socket = socket;
        this.email = this.socket.request.user.email;
        this.userId = this.socket.request.user.id;

        this.authService = manager.get(AuthService.name) as AuthService;
        this.online = manager.get(Online.name) as Online;
        this.callControlService = manager.get(CallControlService.name) as CallControlService;
        this.callService = manager.get(CallService.name) as CallService;
        this.conversationService = manager.get(ConversationService.name) as ConversationService;
        this.historyService = manager.get(HistoryService.name) as HistoryService;

        this.socket.on(CALL_EVENTS.CALL, this.call.bind(this));
        this.socket.on(CALL_EVENTS.ACCEPT_CALL, this.acceptCall.bind(this));
        this.socket.on(CALL_EVENTS.CANCEL_CALL, this.cancelCall.bind(this));
        this.socket.on(CALL_EVENTS.COMPLETE_CALL, this.completeCall.bind(this));
        this.socket.on(CALL_EVENTS.STOP_CALLING, this.stopCalling.bind(this));
        this.socket.on(CALL_EVENTS.AUDIO, this.audio.bind(this));
        this.socket.on(CALL_EVENTS.VIDEO, this.video.bind(this));
    }

    public async call(data: string) {
    }

    public async acceptCall(data: string) {

    }

    public async cancelCall(data: string) {

    }

    public async stopCalling(data: string) {

    }

    public async completeCall(data: string) {

    }

    public async audio(data: string) {

    }

    public async video(data: string) {

    }

}
