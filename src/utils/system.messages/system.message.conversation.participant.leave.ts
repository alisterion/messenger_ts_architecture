import {SystemMessageTypes} from './index';
import {SystemMessageBase} from './system.message.base';

export class SystemMessageConversationParticipantLeave extends SystemMessageBase {
    public readonly type: number = SystemMessageTypes.CONVERSATION_PARTICIPANT_LEAVE;

    public toString(): string {

        return `SYSTEM: Participant '${this.data.username}' left the conversation`;
    }
}
