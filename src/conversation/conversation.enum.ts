export enum CONVERSATION_EVENTS {
    CREATED = 'conversation_created',
    NEW_PARTICIPANT = 'new_participant',
    PARTICIPANT_REMOVED = 'participant_removed',
    NEW_TITLE = 'conversation_new_title',
    PARTICIPANT_LEFT_CONVERSATION = 'participant_left_conversation',
    YOU_REMOVED_FROM_CONVERSATION = 'you_removed_from_conversation',
    YOU_ADDED_TO_CONVERSATION = 'you_added_to_conversation',
    UNREAD_CONVERSATION_COUNT = 'unread_conversation_count',
    MESSAGE_OG_INFO = 'message_og_info',
}

export enum MESSAGE_TYPE {
    TEXT = 'text',
    FILE = 'file',
    IMAGE = 'image',
    SYSTEM = 'system',
    STICKER = 'sticker',
}
