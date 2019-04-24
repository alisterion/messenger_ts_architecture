import {MESSAGE_TYPE} from '../conversation.enum';
import {Message} from '../models';

export class HistoryService {
    private static _name: string = 'conversation.history.service';

    static get name(): string {
        return this._name;
    }

    public async saveMessage(conversationId: string, message: string, author?: string, type?: string): Promise<any> {
        type = type || MESSAGE_TYPE.TEXT;
        return Message.create({
            author,
            body: message,
            conversationId,
            readBy: [author],
            type,
        });
    }
}
