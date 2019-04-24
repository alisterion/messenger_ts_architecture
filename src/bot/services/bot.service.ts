import {Bot} from '../models';

export class BotService {

    private static _name: string = 'bot.service.service';

    static get name(): string {
        return this._name;
    }

    public async get(botId: string): Promise<any> {

    }

    public async getDefaultBot(): Promise<any> {

    }

}
