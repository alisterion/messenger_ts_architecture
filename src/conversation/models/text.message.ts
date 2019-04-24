import {BaseMessage} from './base.message';
import {MESSAGE_TYPE} from '../conversation.enum';

export class TextMessage extends BaseMessage {
    public type: string = MESSAGE_TYPE.TEXT;
    private readonly content: string;

    constructor(data: { content: string, author: string, conversationId: string }) {
        super(data);
        this.content = data.content;
    }

    public async makeBody() {
        return this.content;
    }

    public async prepareToSend() {
        return {
            conversationId: this.conversationId,
            createdAt: this.createdAt,
            id: this.id,
            message: this.content,
            type: this.type,
        };
    }
}
