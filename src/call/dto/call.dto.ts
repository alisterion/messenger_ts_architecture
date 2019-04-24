import {CALL_HISTORY_STATUS, CALL_STATUS, CALL_TYPE} from '../call.enum';
import {CallHistoryModel} from '../call.model';
import {CallUserDTO} from './call.user.dto';

// tslint:disable-next-line:no-namespace
export namespace CallDTO {
    export function toJSON(call: any, user: string): CallHistoryModel {
        return;
    }
}
