import * as commands from 'bot-commander';
import {ConversationUserDTO} from '../../conversation/dto';
import {Online} from '../../socket';
import {BotService} from './bot.service';

export class BotCommandParser {
    private static instance: BotCommandParser;
    private online: Online;
    private botService: BotService;
    private bot: any;
    private socket: any;

    constructor() {
        if (BotCommandParser.instance) {
            return BotCommandParser.instance;
        }
        this.online = new Online();
        this.botService = new BotService();
        commands
            .command('/online')
            .option('-l, --list', 'List users')
            .description('Get online count')
            .action(this.onlineHNDL.bind(this));

        commands
            .command('/monit')
            .option('-s, --stop', 'Stop monit')
            .description('Start monit logs')
            .action(this.monitLogs.bind(this));

        BotCommandParser.instance = this;
    }

    public async parse(input: string, botId: string, socket: any) {

    }

    public async monitLogs(meta: any, opts: any) {

    }

    public async onlineHNDL(meta: any, opts: any) {

    }
}
