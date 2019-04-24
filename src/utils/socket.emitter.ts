import * as config from 'config';
import * as IO from 'socket.io-emitter';
import {Online} from '../socket';

// const ioE = require('socket.io-emitter');

export class SocketEmitter {
    private io: any;
    private online: Online = new Online();

    constructor() {
        this.io = new IO(config.get('redis'));
    }

    public async emit(event: any, userId: string, data: any) {
        const devices = await this.online.getDevicesInfo(userId);
        for (const device of devices) {
            this.io.to(device.socketId).emit(event, JSON.stringify(data));
        }
    }

    public async sendMessage(userId: string, data: any) {
        return this.emit('conversation_message', userId, data);
    }

    public async sendEvent(event: any, userId: string, data: any) {
        return this.emit(event, userId, data);
    }
}
