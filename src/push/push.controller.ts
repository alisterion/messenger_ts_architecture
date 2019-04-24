import {NextFunction, Request, Response} from 'express';
import * as HTTPStatus from 'http-status';
import {ServiceManager} from '../utils';
import {PushService} from './service';

export class PushController {
    private pushService: PushService;

    constructor(serviceManager: ServiceManager) {
        this.pushService = serviceManager.get('push.service');
    }

    public async create(req: Request, res: Response, next: NextFunction) {

        res.status(HTTPStatus.CREATED).json({});
    }
}
