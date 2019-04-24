import {CALL_STATUS} from '../call.enum';
import {Call} from '../call.model';

export class CallService {
    private static _name: string = 'call.service';

    static get name(): string {
        return this._name;
    }

    public async create(data: any): Promise<any> {
    }

    public async get(id: string): Promise<any> {
    }

    public async updateStatus(id: string, status: string) {
    }

    public async filter(data: any): Promise<any> {
    }

    public async count(data: any): Promise<any> {
        return Call.count(data);
    }

    public async calculateDuration(id: string): Promise<any> {
    }

    public async setStartTime(id: string): Promise<any> {
    }

    public async cancel(id: string) {
        return this.updateStatus(id, CALL_STATUS.CANCELED);
    }

    public async busy(id: string) {
        return this.updateStatus(id, CALL_STATUS.BUSY);
    }

    public async ringin(id: string) {
    }

    public async inProgress(id: string) {
    }

    public async completed(id: string) {
    }

    public async noAnswer(id: string) {
    }

}
