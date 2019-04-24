import * as bluebird from 'bluebird';
import * as config from 'config';
import * as redis from 'redis';
import {ClientOpts} from 'redis';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class CallControlService {

    private static _name: string = 'call.control.service';

    private client: any;
    private readonly prefix: string;
    private readonly ringCount: number;

    constructor() {
        this.prefix = 'call_';
        const options = {prefix: this.prefix, ...config.get('redis')} as ClientOpts;
        this.client = redis.createClient(options);
        this.ringCount = 10;
    }

    static get name(): string {
        return this._name;
    }

    public async initCall(callId: string) {

    }

    public async canRing(callId: string) {

    }

    public async add(callId: string, info: object) {
    }

    public async get(callId: string) {
    }

    public async remove(callId: string) {
    }
}
