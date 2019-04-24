import * as config from 'config';
import * as getUrls from 'get-urls';
import * as kue from 'kue';
import * as ogs from 'open-graph-scraper';
import * as winston from 'winston';
import {SocketEmitter} from '../../utils';
import {CONVERSATION_EVENTS} from '../conversation.enum';
import {ConversationService, MessageService} from './index';

export class QueueService {

    static get name(): string {
        return this._name;
    }

    private static _name: string = 'conversation.queue.service';
    private queue: any;

    constructor() {

    }

    public createJob(name: string, data: any) {
        winston.info(`Try to create ${name}`);

        const job = this.queue.create(name, data).save();

        job.on('complete', (result: any) => {
            winston.info(`Job completed with data ${result}`);

        }).on('failed attempt', (errorMessage: any, doneAttempts: any) => {
            winston.info('Job failed');

        }).on('failed', (errorMessage: any) => {
            winston.info('Job failed');

        }).on('progress', (progress: any, progressData: any) => {
            winston.info('\r  job #' + job.id + ' ' + progress + '% complete with data ', progressData);

        });

    }
}
