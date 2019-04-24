import {ValidationError} from './validation.error';

export class UserOfflineError extends ValidationError {
    constructor(userId: string) {
        super(`User ${userId} is offline`);
    }
}
