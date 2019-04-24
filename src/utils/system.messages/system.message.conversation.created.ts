import {SystemMessageTypes} from './index';
import {SystemMessageBase} from './system.message.base';

export class SystemMessageConversationCreated extends SystemMessageBase {
    public readonly type: number = SystemMessageTypes.CONVERSATION_CREATED;

    public toString(): string {

        return `SYSTEM: Conversation '${this.data.title}' was created`;
    }
}
