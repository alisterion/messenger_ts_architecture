import {Message} from './index';
import {isObject} from '../../utils';

export class BaseMessage {
    public author: string;
    public body: string;
    public conversationId: string;
    public type: string;
    private dbInstance: any;

    constructor(data: { author: string, conversationId: string }) {
        this.author = data.author;
        this.conversationId = data.conversationId;
    }

    public get id() {
        return this.dbInstance._id.toString();
    }

    public get objectId() {
        return this.dbInstance._id;
    }

    public get createdAt() {
        return this.dbInstance.createdAt;
    }

    public getAdditionalData() {
        return {};
    }

    public async save(): Promise<any> {
        const rawBody = await this.makeBody();
        const body = isObject(rawBody) ? JSON.stringify(rawBody) : rawBody;
        const additional = this.getAdditionalData();
        this.dbInstance = await Message.create({
            author: this.author,
            body,
            conversationId: this.conversationId,
            readBy: [this.author],
            type: this.type,
            ...additional,
        });
        return true;
    }

    public async serialize(): Promise<any> {
        return await  this.prepareToSend();
    }

    protected async makeBody(): Promise<any> {
        return {};
    }

    protected async prepareToSend(): Promise<any> {
        return {};
    }
}
