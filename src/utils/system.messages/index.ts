import {SystemMessageConversationCreated} from './system.message.conversation.created';
import {SystemMessageConversationParticipantAdd} from './system.message.conversation.participant.add';
import {SystemMessageConversationParticipantLeave} from './system.message.conversation.participant.leave';
import {SystemMessageConversationParticipantRemoved} from './system.message.conversation.participant.removed';
import {SystemMessageConversationTitleChanged} from './system.message.conversation.title.changed';

export interface ISystemMessage {
    readonly type: number;
    readonly data: any;

    toString(): string;
}

export enum SystemMessageTypes {
    CONVERSATION_CREATED,
    CONVERSATION_TITLE_CHANGED,
    CONVERSATION_PARTICIPANT_ADD,
    CONVERSATION_PARTICIPANT_REMOVED,
    CONVERSATION_PARTICIPANT_LEAVE,
}

export class SystemMessageFactory {
    public createMessage(type: object);
    public createMessage(type: SystemMessageTypes.CONVERSATION_CREATED): SystemMessageConversationCreated;
    public createMessage(
        type: SystemMessageTypes.CONVERSATION_TITLE_CHANGED): SystemMessageConversationTitleChanged;
    public createMessage(
        type: SystemMessageTypes.CONVERSATION_PARTICIPANT_ADD): SystemMessageConversationParticipantAdd;
    public createMessage(
        type: SystemMessageTypes.CONVERSATION_PARTICIPANT_REMOVED): SystemMessageConversationParticipantRemoved;
    public createMessage(
        type: SystemMessageTypes.CONVERSATION_PARTICIPANT_LEAVE): SystemMessageConversationParticipantLeave;

    public createMessage(options: any):
        SystemMessageConversationCreated |
        SystemMessageConversationTitleChanged |
        SystemMessageConversationParticipantAdd |
        SystemMessageConversationParticipantLeave |
        SystemMessageConversationTitleChanged |
        SystemMessageConversationParticipantRemoved {
        switch (options.type) {
            case SystemMessageTypes.CONVERSATION_CREATED:
                return new SystemMessageConversationCreated(options.data);
            case SystemMessageTypes.CONVERSATION_TITLE_CHANGED:
                return new SystemMessageConversationTitleChanged(options.data);
            case SystemMessageTypes.CONVERSATION_PARTICIPANT_ADD:
                return new SystemMessageConversationParticipantAdd(options.data);
            case SystemMessageTypes.CONVERSATION_PARTICIPANT_REMOVED:
                return new SystemMessageConversationParticipantRemoved(options.data);
            case SystemMessageTypes.CONVERSATION_PARTICIPANT_LEAVE:
                return new SystemMessageConversationParticipantLeave(options.data);
            default:
                throw new Error();
        }

    }
}
