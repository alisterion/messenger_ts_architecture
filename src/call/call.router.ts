import * as express from 'express';
import * as validation from 'express-validation';
import {RouterInterface} from '../type';
import {UserController} from '../user/user.controller';
import {ServiceManager} from '../utils';
import {CallController} from './call.controller';
import {CreateCall} from './call.validation';
import {CallControlService} from './service/call.controll.service';
import {CallService} from './service/call.service';

export class CallRouter implements RouterInterface {
    public path: string;
    public controller: CallController;
    public userController: UserController;

    constructor(manager: ServiceManager) {
        this.path = '/call';

        const callService = new CallService();
        const callControlService = new CallControlService();

        manager.register(callService, CallService.name);
        manager.register(callControlService, CallControlService.name);

        this.controller = new CallController(manager);
        this.userController = new UserController(manager);
    }

    public create(): express.Router {
        const router = express.Router();
        router.post(`/`,
            validation(CreateCall),
            this.userController.authenticate.bind(this.userController),
            this.controller.create.bind(this.controller),
        );
        return router;
    }

    public history(): express.Router {
        const router = express.Router();
        router.get(`/history`,
            this.userController.authenticate.bind(this.userController),
            this.controller.history.bind(this.controller),
        );
        return router;
    }

    public cancelCall(): express.Router {
        const router = express.Router();
        router.post(`/:callId/cancel`,
            this.userController.authenticate.bind(this.userController),
            this.controller.cancelCall.bind(this.controller),
        );
        return router;
    }
}
