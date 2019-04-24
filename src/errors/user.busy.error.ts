import {ValidationError} from './validation.error';

export class UserBusyError extends ValidationError {
    constructor(userId: string) {
        super(`User ${userId} is busy`);
    }
}
