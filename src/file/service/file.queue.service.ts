import * as config from 'config';
import * as kue from 'kue';
import * as mongoose from 'mongoose';
import * as winston from 'winston';
import {MessageService} from '../../conversation/service';
import {SocketEmitter} from '../../utils';
import {FILE_STATUS} from '../file.enum';
import {FileModel} from '../models/file.model';
import {FileService} from './file.service';
import {FileDTO} from "../dto/file.dto";

export class FileQueueService {

    static get name(): string {
        return this._name;
    }

    private static _name: string = 'file.queue.service';
    private queue: any;

    constructor() {
        this.queue = kue.createQueue(
            {
                redis: {...config.get('redis')},
            },
        );
        this.queue.process('checkFileIsUploaded', async (job: any, done: any) => {

        });

    }

    public createJob(name: string, data: any, delay: number = 0) {
        winston.info(`Try to create ${name}`);

        const job = this.queue.create(name, data)
            .delay(delay * 1000)
            .save();

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
