import {SystemMessageTypes} from './index';
import {SystemMessageBase} from './system.message.base';

export class SystemMessageConversationParticipantRemoved extends SystemMessageBase {
    public readonly type: number = SystemMessageTypes.CONVERSATION_PARTICIPANT_REMOVED;

    public toString(): string {
        return `SYSTEM: Participant '${this.data.username}' has been removed`;
    }
}
