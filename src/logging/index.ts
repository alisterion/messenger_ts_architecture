import * as rp from 'request-promise';

const PROJECT_ID = 'server';
const LOG_URL = 'http://bot.alisterion.com';

export class BotLogging {
    public readonly bot: any;

    public async send(message: string) {

        const options = {
            body: {message, project: PROJECT_ID},
            json: true,
            method: 'POST',
            uri: `${LOG_URL}/api/logger/`,
        };
        return rp(options);

    }

}
