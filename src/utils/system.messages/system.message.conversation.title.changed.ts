import {SystemMessageTypes} from './index';
import {SystemMessageBase} from './system.message.base';

export class SystemMessageConversationTitleChanged extends SystemMessageBase {
    public readonly type: number = SystemMessageTypes.CONVERSATION_TITLE_CHANGED;
    public readonly data: any;

    public toString(): string {

        return `SYSTEM: Conversation title changed to '${this.data.title}'`;
    }
}
