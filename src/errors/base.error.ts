import * as HTTPStatus from 'http-status';
import {ErrorStatus, InterfaceError} from './interface.error';

export class BaseError extends Error implements InterfaceError {
    public code: number;
    public status: string;

    constructor(public message: string) {
        super(message);
        this.code = HTTPStatus.SERVICE_UNAVAILABLE;
        this.status = ErrorStatus.UNKNOWN_ERROR;
    }

    public toJSON() {
        return {
            code: this.code,
            message: this.message,
            status: this.status,
        };
    }
}
