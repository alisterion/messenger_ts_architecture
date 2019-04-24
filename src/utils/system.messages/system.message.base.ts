import {ISystemMessage} from './index';

export class SystemMessageBase implements ISystemMessage {
    public readonly data: any;
    public readonly type: number;

    constructor(data: any) {
        this.data = data;
    }
}