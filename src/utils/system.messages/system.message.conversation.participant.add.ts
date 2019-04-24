import {SystemMessageTypes} from './index';
import {SystemMessageBase} from './system.message.base';

export class SystemMessageConversationParticipantAdd extends SystemMessageBase {
    public readonly type: number = SystemMessageTypes.CONVERSATION_PARTICIPANT_ADD;

    public toString(): string {
        return `SYSTEM: Participant '${this.data.username}' has been added`;
    }

}
