import * as HTTPStatus from 'http-status';
import {BaseError} from './base.error';
import {ErrorStatus, InterfaceError} from './interface.error';

export class NotFoundError extends BaseError implements InterfaceError {
    public code: number = HTTPStatus.NOT_FOUND;
    public status: string = ErrorStatus.NOT_FOUND_ERROR as string;
}
