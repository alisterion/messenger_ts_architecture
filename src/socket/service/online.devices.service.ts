import * as bluebird from 'bluebird';
import * as config from 'config';
import * as redis from 'redis';
import {ClientOpts} from 'redis';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class OnlineDevicesService {
    private static instance: OnlineDevicesService;

    private client: any;
    private prefix: string;

    constructor() {
        if (OnlineDevicesService.instance) {
            return OnlineDevicesService.instance;
        }

        this.prefix = 'device_';
        const options = {...config.get('redis'), prefix: this.prefix} as ClientOpts
        this.client = redis.createClient(options);

        OnlineDevicesService.instance = this;
    }

    public async getDevices(userId: string) {

    }

    public async add(userId: string, info: any) {

    }

    public async remove(userId: string) {

    }

    public async removeMass(devices: Array<string>) {

    }

    public async getAllDevices(users: Array<string>) {

    }

    public async find(pattern: string) {

    }
}
