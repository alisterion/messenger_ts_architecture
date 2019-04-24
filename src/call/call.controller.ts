import {NextFunction, Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import {UserBusyError} from '../errors';
import {Online} from '../socket';
import {CALL_EVENTS} from '../socket/socket.enum';
import {SocketUserModel} from '../socket/socket.model';
import {UserService} from '../user/service/user.service';
import {Pagination, ServiceManager} from '../utils';
import {SocketEmitter} from '../utils';
import {CALL_STATUS} from './call.enum';
import {Call} from './call.model';
import {CallDTO} from './dto/call.dto';
import {CallControlService} from './service/call.controll.service';
import {CallService} from './service/call.service';

export class CallController {
    private callService: CallService;
    private userService: UserService;
    private online: Online;
    private callControlService: CallControlService;

    constructor(serviceManager: ServiceManager) {
        this.callService = serviceManager.get('call.service');
        this.userService = serviceManager.get('user.service');
        this.online = serviceManager.get('socket.online.service');
        this.callControlService = serviceManager.get('call.control.service');
    }

    public async create(req: Request, res: Response, next: NextFunction) {

    }

    public async history(req: Request, res: Response, next: NextFunction) {

    }
}
