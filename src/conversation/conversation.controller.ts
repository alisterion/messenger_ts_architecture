import {NextFunction, Request, Response} from 'express';
import {ValidationError} from '../errors';
import {UserService} from '../user/service/user.service';
import {Pagination, ServiceManager, SocketEmitter} from '../utils';
import {SystemMessageFactory, SystemMessageTypes} from '../utils/system.messages';
import {ConversationService, HistoryService, MessageService, SystemMessageService} from './';
import {CONVERSATION_EVENTS} from './conversation.enum';
import {ConversationDTO, MessageDTO} from './dto';
import {Conversation, Message} from './models';

export class ConversationController {
    private historyService: HistoryService;
    private userService: UserService;
    private conversationService: ConversationService;
    private systemMessageService: SystemMessageService;
    private systemMessageFactory: SystemMessageFactory = new SystemMessageFactory();
    private messageService: MessageService;

    constructor(serviceManager: ServiceManager) {
        this.historyService = serviceManager.get('conversation.history.service');
        this.userService = serviceManager.get('user.service');
        this.conversationService = serviceManager.get('conversation.service');
        this.systemMessageService = serviceManager.get(SystemMessageService.name);
        this.messageService = serviceManager.get(MessageService.name);
    }

    public async dialog(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/dialog:
         *   post:
         *     tags:
         *      - Conversation
         *     description:
         *      Create of dialog.
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *              type: object
         *              properties:
         *                  -participant:
         *                      type: string
         *                      required: true
         *
         *     responses:
         *       200:
         *         description: Conversations
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation:
         *   post:
         *     tags:
         *      - Conversation
         *     description:
         *      Create conversation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *              type: object
         *              properties:
         *                  -participants:
         *                      type: array
         *                      required: true
         *                      items:
         *                          type: string
         *     responses:
         *       200:
         *         description: Conversation
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async edit(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/:conversationId:
         *   post:
         *     tags:
         *      - Conversation
         *     description:
         *      Edit conversation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *              type: object
         *              properties:
         *                  -title:
         *                      type: string
         *                      required: true
         *
         *     responses:
         *       200:
         *         description: Conversation
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async addParticipants(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/:conversationId:
         *   put:
         *     tags:
         *      - Conversation
         *     description:
         *      Add participants to conversation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *              type: object
         *              properties:
         *                  -participants:
         *                      type: array
         *                      required: true
         *                      items:
         *                          type: string
         *     responses:
         *       200:
         *         description: Conversation
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async removeParticipants(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/:conversationId:
         *   delete:
         *     tags:
         *      - Conversation
         *     description:
         *      Delete participants from conversation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: body
         *         in: body
         *         required: true
         *         schema:
         *              type: object
         *              properties:
         *                  -participants:
         *                      type: array
         *                      required: true
         *                      items:
         *                          type: string
         *     responses:
         *       200:
         *         description: Conversation
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async leave(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/:conversationId/leave:
         *   delete:
         *     tags:
         *      - Conversation
         *     description:
         *       Leave from conversation
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Conversation
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async list(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation:
         *   get:
         *     tags:
         *      - Conversation
         *     description:
         *      List of conversation
         *     produces:
         *       - application/json
         *     parameters:
         *       - name: page
         *         in: query
         *         type: integer
         *         required: false
         *     responses:
         *       200:
         *         description: Conversations
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async history(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/:conversationId/history:
         *   get:
         *     tags:
         *      - Conversation
         *     description:
         *      History of conversation by id.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Conversations
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async historyByRecipient(req: Request, res: Response, next: NextFunction) {
        /**
         * @swagger
         * /api/conversation/user/:recipient/history:
         *   get:
         *     tags:
         *      - Conversation
         *     description:
         *      History of conversation by recipient id.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Conversations
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
    }

    public async unreadCount(req: Request, res: Response, next: NextFunction) {

    }
}
