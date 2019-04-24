import * as express from 'express';
import * as validation from 'express-validation';
import {RouterInterface} from '../type';
import {UserController} from '../user/user.controller';
import {ServiceManager} from '../utils';
import {FileController} from './file.controller';
import {CreateConversationFile} from './file.validation';
import {FileQueueService} from './service/file.queue.service';
import {FileService} from './service/file.service';

export class FileRouter implements RouterInterface {
    public path: string = '/file';
    public controller: FileController;
    public userController: UserController;

    constructor(manager: ServiceManager) {
        const stickerService = new FileService();
        manager.register(stickerService, FileService.name);

        const fileQueueService = new FileQueueService();
        manager.register(fileQueueService, FileQueueService.name);

        this.userController = new UserController(manager);
        this.controller = new FileController(manager);
    }

    public create(): express.Router {

        const router = express.Router();

        router.post(`/`,
            validation(CreateConversationFile),
            this.userController.authenticate.bind(this.userController),
            this.controller.create.bind(this.controller),
        );
        return router;
    }

    public upload(): express.Router {
        const router = express.Router();

        router.post(`/upload`,
            this.userController.authenticate.bind(this.userController),
            this.controller.upload.bind(this.controller),
        );
        return router;
    }

}
