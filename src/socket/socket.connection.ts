import {CALL_STATUS, CallSocketController} from '../call';
import {CallService} from '../call/service/call.service';
import {ConversationSocketController} from '../conversation';
import {UserService} from '../user/service/user.service';
import {RSASecurity, ServiceManager} from '../utils';
import {Online} from './service/online.socket.service';
import {CALL_EVENTS, CONNECTION_EVENTS} from './socket.enum';
import {SocketUserModel} from './socket.model';

export class Connection {

    private readonly userId: string;
    private readonly socket: any;
    private readonly email: string;

    private io: any;
    private online: Online;
    private userService: UserService;
    private serviceManager: ServiceManager;

    constructor(socket: any, io: any, serviceManager: ServiceManager) {
        this.serviceManager = serviceManager;
        this.io = io;
        this.socket = socket;
        this.userId = this.socket.request.user.id;
        this.email = this.socket.request.user.email;

        this.online = this.serviceManager.get(Online.name);
        this.userService = this.serviceManager.get(UserService.name);
    }

    public async sdp(data: string) {

    }

    public async ice(data: string) {

    }

    public async receivePublicKey(data: string) {

    }

    public async disconnect() {

    }

    public async terminateAllActiveCalls() {

    }

    public async broadcastAboutOnlineComing(userId: string) {

    }

    public async broadcastAboutOffline(userId: string) {

    }

    public async connect() {

    }
}
