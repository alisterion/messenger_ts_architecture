import * as express from 'express';
import {RouterInterface} from '../type';
import {ServiceManager} from '../utils';
import {UserController} from '../user/user.controller';
import {StickerController} from './sticker.controller';
import {StickerService} from './service';

export class StickerRouter implements RouterInterface {
    public path = '/sticker';
    public controller: StickerController;
    public userController: UserController;

    constructor(manager: ServiceManager) {
        const stickerService = new StickerService();
        manager.register(stickerService, StickerService.name);

        this.userController = new UserController(manager);
        this.controller = new StickerController(manager);
    }

    public packs(): express.Router {
        const router = express.Router();
        router.get(`/`,
            this.userController.authenticate.bind(this.userController),
            this.controller.packs.bind(this.controller),
        );
        return router;
    }

    public pack(): express.Router {
        const router = express.Router();
        router.get(`/:packId`,
            this.userController.authenticate.bind(this.userController),
            this.controller.pack.bind(this.controller),
        );
        return router;
    }

}
