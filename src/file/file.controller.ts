import {NextFunction, Request, Response} from 'express';
import {ConversationManager} from '../conversation/conversation.manager';
import {ServiceManager, SocketEmitter} from '../utils';

import * as mongoose from 'mongoose';
import * as multiparty from 'multiparty';
import {ConversationService, MessageService} from '../conversation/service';
import {FileDTO} from './dto/file.dto';
import {FILE_EVENTS, FILE_STATUS} from './file.enum';
import {FileQueueService} from './service/file.queue.service';
import {FileService} from './service/file.service';

export class FileController {
    public fileService: FileService;
    public conversationService: ConversationService;
    public messageService: MessageService;
    private queueService: FileQueueService;

    constructor(managerserviceManager: ServiceManager) {
        this.fileService = managerserviceManager.get(FileService.name);
        this.conversationService = managerserviceManager.get(ConversationService.name);
        this.messageService = managerserviceManager.get(MessageService.name);
        this.queueService = managerserviceManager.get(FileQueueService.name);

    }

    public async create(req: Request, res: Response, next: NextFunction) {

    }

    public async upload(req: Request, res: Response, next: NextFunction) {

    }
}
