import {Push} from '../push.model';

export class PushService {

    private static _name: string = 'push.service';

    static get name(): string {
        return this._name;
    }

    public async create(data: any): Promise<any> {
        return Push.create(data);
    }

    public async get(data: any): Promise<any> {
        return Push.findOne(data);
    }

    public async filter(data: any): Promise<any> {
        return Push.find(data);
    }

    public async delete(data: any): Promise<any> {
        return Push.remove(data);
    }
}
