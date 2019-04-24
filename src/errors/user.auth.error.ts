import * as HTTPStatus from 'http-status';
import {BaseError} from './base.error';
import {ErrorStatus, InterfaceError} from './interface.error';

export class UserAuthError extends BaseError implements InterfaceError {
    public code: number = HTTPStatus.UNAUTHORIZED;
    public status: string = ErrorStatus.AUTH_ERROR as string;
    public message: string;
}
