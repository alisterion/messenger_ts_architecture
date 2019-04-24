import * as express from 'express';
import * as validation from 'express-validation';
import {RouterInterface} from '../type';
import {UserController} from '../user/user.controller';
import {ServiceManager} from '../utils';
import {ConversationService, HistoryService, MessageService, QueueService, SystemMessageService} from './';
import {ConversationController} from './conversation.controller';
import {CreateConversation, CreateDialog, EditConversation, RemoveOrAddParticipant} from './conversation.validation';

export class ConversationRouter implements RouterInterface {
    public path: string;
    public controller: ConversationController;
    public userController: UserController;

    constructor(manager: ServiceManager) {
        this.path = '/conversation';
        const historyService = new HistoryService();
        manager.register(historyService, HistoryService.name);

        const conversationService = new ConversationService();
        manager.register(conversationService, ConversationService.name);

        const messageService = new MessageService();
        manager.register(messageService, MessageService.name);

        const systemMessageService = new SystemMessageService();
        manager.register(systemMessageService, SystemMessageService.name);

        const queueService = new QueueService();
        manager.register(queueService, QueueService.name);

        this.controller = new ConversationController(manager);
        this.userController = new UserController(manager);
    }

    public create(): express.Router {
        const router = express.Router();
        router.post(`/`,
            validation(CreateConversation),
            this.userController.authenticate.bind(this.userController),
            this.controller.create.bind(this.controller),
        );
        return router;
    }

    public dialog(): express.Router {
        const router = express.Router();
        router.post(`/dialog`,
            validation(CreateDialog),
            this.userController.authenticate.bind(this.userController),
            this.controller.dialog.bind(this.controller),
        );
        return router;
    }

    public addParticipants(): express.Router {
        const router = express.Router();
        router.put(`/:conversationId/participants`,
            validation(RemoveOrAddParticipant),
            this.userController.authenticate.bind(this.userController),
            this.controller.addParticipants.bind(this.controller),
        );
        return router;
    }

    public removeParticipants(): express.Router {
        const router = express.Router();
        router.delete(`/:conversationId/participants`,
            validation(RemoveOrAddParticipant),
            this.userController.authenticate.bind(this.userController),
            this.controller.removeParticipants.bind(this.controller),
        );
        return router;
    }

    public leaveConversation(): express.Router {
        const router = express.Router();
        router.delete(`/:conversationId/leave`,
            this.userController.authenticate.bind(this.userController),
            this.controller.leave.bind(this.controller),
        );
        return router;
    }

    public edit(): express.Router {
        const router = express.Router();
        router.post(`/:conversationId`,
            validation(EditConversation),
            this.userController.authenticate.bind(this.userController),
            this.controller.edit.bind(this.controller),
        );
        return router;
    }

    public list(): express.Router {
        const router = express.Router();
        router.get(`/`,
            this.userController.authenticate.bind(this.userController),
            this.controller.list.bind(this.controller),
        );
        return router;
    }

    public history(): express.Router {
        const router = express.Router();
        router.get(`/:conversationId/history`,
            this.userController.authenticate.bind(this.userController),
            this.controller.history.bind(this.controller),
        );
        return router;
    }

    public historyByRecipient(): express.Router {
        const router = express.Router();
        router.get(`/user/:recipient/history`,
            this.userController.authenticate.bind(this.userController),
            this.controller.historyByRecipient.bind(this.controller),
        );
        return router;
    }

    public unreadCount(): express.Router {
        const router = express.Router();
        router.get(`/unread`,
            this.userController.authenticate.bind(this.userController),
            this.controller.unreadCount.bind(this.controller),
        );
        return router;
    }
}
