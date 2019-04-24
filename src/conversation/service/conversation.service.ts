import {Conversation} from '../models';

export class ConversationService {

    private static _name: string = 'conversation.service';

    static get name(): string {
        return this._name;
    }

    public async getOneById(id: string): Promise<any> {
    }

    public async updateOne(id: string, data: any) {

    }

    public async createByParticipants(participants: Array<string>,
                                      owner: string,
                                      isDialog: boolean = false): Promise<any> {
    }

    public async findByParticipants(participants: Array<string>, isDialog: boolean = false): Promise<any> {

    }

    public async getOrCreate(participants: Array<string>, owner: string, isDialog: boolean = false): Promise<any> {

    }

    private _preparePartisipants(participants: Array<string>) {
    }
}
