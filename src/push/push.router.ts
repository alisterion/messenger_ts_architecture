import * as express from 'express';
import * as validation from 'express-validation';
import {RouterInterface} from '../type';
import {UserController} from '../user/user.controller';
import {ServiceManager} from '../utils';
import {PushController} from './push.controller';
import {CreatePush} from './push.validation';
import {PushService} from './service';

export class PushRouter implements RouterInterface {
    public path: string;
    public controller: PushController;
    public userController: UserController;

    constructor(manager: ServiceManager) {
        this.path = '/push';

        const pushService = new PushService();

        manager.register(pushService, PushService.name);

        this.controller = new PushController(manager);
        this.userController = new UserController(manager);
    }

    public create(): express.Router {
        const router = express.Router();
        router.post('/',
            validation(CreatePush),
            this.userController.authenticate.bind(this.userController),
            this.controller.create.bind(this.controller),
        );
        return router;
    }
}
