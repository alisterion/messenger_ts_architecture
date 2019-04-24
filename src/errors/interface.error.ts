export interface InterfaceError {
    code: number;
    message: string;
    status: string;
    stack?: any;
}

export enum ErrorStatus {
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
    AUTH_ERROR = 'AUTH_ERROR',
    VALIDATION_ERROR = 'VALIDATION_ERROR',
}
