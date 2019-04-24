export enum CALL_EVENTS {
    CALL = 'call',
    ACCEPT_CALL = 'accept_call',
    CALL_ACCEPTED = 'call_accepted',
    CANCEL_CALL = 'cancel_call',
    CALL_NO_ANSWER = 'call_no_answer',
    COMPLETE_CALL = 'complete_call',
    STOP_CALLING = 'stop_calling',
    AUDIO = 'audio',
    VIDEO = 'video',
}

export enum CONNECTION_EVENTS {
    ICE = 'ice',
    SDP = 'sdp',
    KEY = 'key',
    SEND_MESSAGE_TOKEN = 'message_token',
    USER_HAS_COME_ONLINE = 'online',
    USER_HAS_GONE_OFFLINE = 'offline',
}

export enum CHAT_EVENTS {
    PRIVATE_MESSAGE = 'private_message',
    CONVERSATION_MESSAGE = 'conversation_message',
    READ_MESSAGE = 'read',
    START_TYPING = 'start_typing',
    FINISH_TYPING = 'finish_typing',
    MESSAGE_ID = 'message_id',
}
