import * as bluebird from 'bluebird';
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as cors from 'cors';
import * as ejs from 'ejs';
import * as express from 'express';
import * as validation from 'express-validation';
import * as expressWinston from 'express-winston';
import {createServer, Server} from 'http';
import * as moment from 'moment';
import * as mongoose from 'mongoose';
import * as os from 'os';
import * as path from 'path';
import * as SocketIo from 'socket.io';
import * as winston from 'winston';
import {CallRouter} from './call';
import {ConversationRouter} from './conversation';
import {InterfaceError} from './errors';
import {PushRouter} from './push';
import {SocketManager} from './socket';
import {chat, index, web} from './socket/socket.controller';
import {StickerRouter} from './sticker';
import {UserRouter} from './user';
import {ServiceManager} from './utils';

require('express-async-errors');
import {APIDocsRouter} from './docs';
import {FileRouter} from './file/file.router';
import {BotLogging} from './logging';

const LOGGING = new BotLogging();

export class SignalServer {
    public static readonly PORT: number = 3000;
    public static serviceManager: ServiceManager;
    public static serverInstance: SignalServer;
    private app: express.Application;
    private server: Server;
    private io: SocketIo.Server;
    private port: string | number;
    private baseURL = '/api';

    public getApp(): express.Application {
        return this.app;
    }

    public getIO() {
        return this.io;
    }

    public run() {

        this.createApp();
        this.connectStatic();
        this.config();
        this.initDb();
        this.createServer();
        this.createLogger();
        this.initRouters();
        this.sockets();
        this.listen();
        this.errorCatcher();
        SignalServer.serverInstance = this;

        winston.info(`Run server on ${this.app.settings.env.toUpperCase()} environment`);
        LOGGING.send(`Server is running on
        ${os.userInfo().username} | ${os.hostname()} | ${this.app.settings.env.toUpperCase()}
         environment`);
    }

    private initDb(): void {
        const mongoUrl = config.get('db.url') as string;
        winston.info(`Connecting to ${mongoUrl}`);
        (mongoose).Promise = bluebird;
        mongoose.connect(mongoUrl, {
            promiseLibrary: bluebird,
            ...config.get('db.options'),
        }).then(() => {
                winston.info('MongoDB connection successfully.');
            },
        ).catch((err: any) => {
            winston.error('MongoDB connection error. Please make sure MongoDB is running. ' + err);
        });

    }

    private initRouters(): void {

        SignalServer.serviceManager = new ServiceManager(this.app);

        // TODO: make auto init
        const userRouter = new UserRouter(SignalServer.serviceManager);

        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.auth());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.logout());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.register());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.request_2fa());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.confirm_2fa());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.info());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.contacts());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.myContacts());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.selfProfileUpdate());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.search());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.contactAdd());
        this.app.use(`${this.baseURL}${userRouter.path}`, userRouter.contactRemove());

        const callRouter = new CallRouter(SignalServer.serviceManager);
        this.app.use(`${this.baseURL}${callRouter.path}`, callRouter.create());
        this.app.use(`${this.baseURL}${callRouter.path}`, callRouter.history());
        this.app.use(`${this.baseURL}${callRouter.path}`, callRouter.cancelCall());

        const conversationRouter = new ConversationRouter(SignalServer.serviceManager);
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.create());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.dialog());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.addParticipants());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.removeParticipants());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.leaveConversation());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.edit());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.list());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.history());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.historyByRecipient());
        this.app.use(`${this.baseURL}${conversationRouter.path}`, conversationRouter.unreadCount());

        const pushRouter = new PushRouter(SignalServer.serviceManager);
        this.app.use(`${this.baseURL}${pushRouter.path}`, pushRouter.create());

        const stickerRouter = new StickerRouter(SignalServer.serviceManager);
        this.app.use(`${this.baseURL}${stickerRouter.path}`, stickerRouter.pack());
        this.app.use(`${this.baseURL}${stickerRouter.path}`, stickerRouter.packs());

        const fileRouter = new FileRouter(SignalServer.serviceManager);
        this.app.use(`${this.baseURL}${fileRouter.path}`, fileRouter.upload());
        this.app.use(`${this.baseURL}${fileRouter.path}`, fileRouter.create());

        const docs = new APIDocsRouter();
        this.app.use(`${this.baseURL}/docs`, docs.getRouter());

    }

    private createApp(): void {
        this.app = express();
    }

    private createLogger(): void {

    }

    private createServer(): void {
        this.app.use(cors({}));
        this.app.use(bodyParser.json());

        this.app.set('views', path.join(__dirname, '../../views'));
        this.app.engine('html', ejs.renderFile);
        this.app.set('view engine', 'html');
        this.app.use('/static', express.static('public'));
        this.app.use('/stickers', express.static('media/stickers'));
        this.app.use('/public', express.static('media/upload'));
        this.app.get('/test', index);
        this.app.get('/web', chat);
        this.app.get('/', index);

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });

        this.server = createServer(this.app);

    }

    private config(): void {
        this.port = process.env.PORT || SignalServer.PORT;
    }

    private sockets(): void {
        this.io = SocketIo(this.server);
    }

    private errorCatcher(): void {
    }

    private listen(): void {

        this.server.listen(this.port, () => {
            winston.info('Running server on port %s', this.port);
        });

        const socket = new SocketManager(this.io, SignalServer.serviceManager);
        socket.run();
    }

    private connectStatic() {
        this.app.use(express.static(path.join(__dirname, 'static'), {maxAge: 31557600000}));
        this.app.use(express.static(path.join(__dirname, 'media/stickers'), {maxAge: 31557600000}));
    }
}
