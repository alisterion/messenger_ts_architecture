export enum USER_ONLINE_STATUS {
    AVAILABLE,
    ON_CALL,
}

export interface SocketUserModel {
    id: string;
    socketId: string;
    avatar: string;
    email: string;
    first_name: string;
    mobile_number: string;
    status: USER_ONLINE_STATUS;
    clientPublicKey?: string;
    messageToken?: string;
}
