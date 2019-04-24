import * as HTTPStatus from 'http-status';
import {BaseError} from './base.error';
import {ErrorStatus, InterfaceError} from './interface.error';

export class ValidationError extends BaseError implements InterfaceError {
    public code: number = HTTPStatus.BAD_REQUEST;
    public status: string = ErrorStatus.VALIDATION_ERROR as string;
}
