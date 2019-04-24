import * as bluebird from 'bluebird';
import * as config from 'config';
import * as redis from 'redis';
import * as winston from 'winston';

import {SocketUserModel, USER_ONLINE_STATUS} from '../socket.model';
import {OnlineDevicesService} from './online.devices.service';

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

export class Online {
    private static _name: string = 'socket.online.service';

    private static instance: Online;
    private client: any;
    private readonly prefix: string;
    private deviceService: OnlineDevicesService;

    constructor() {
        if (Online.instance) {
            return Online.instance;
        }

        this.prefix = 'user_';
        const options = {...config.get('redis'), prefix: this.prefix};
        this.client = redis.createClient(options);
        this.deviceService = new OnlineDevicesService();

        Online.instance = this;
    }

    public static get name(): string {
        return this._name;
    }

    public async add(userId: string, info: SocketUserModel) {

    }

    public async get(userId: string) {
        const dataString = await this.client.getAsync(userId);
        return JSON.parse(dataString);
    }

    public async update(userId: string, data: any) {

    }

    public async remove(userId: string, socketId: string) {

    }

    public async isOnline(userId: string) {

    }

    public async count() {

    }

    public async getOnlineUsers() {

    }

    public async isAvailable(userId: string) {

    }

    public async calling(userId: string) {

    }

    public async available(userId: string) {

    }

    public async isUsersOnline(users: Array<string>) {

    }

    public async getSocketsById(users: Array<string>) {

    }

    public async getDevices(userId: string) {

    }

    public async getDevicesInfo(userId: string) {

    }

    public async removeDevices(userId: string, devices: Array<string>) {

    }

    public async removeDevicesBySocketId(devices: Array<string>) {


    }

}
