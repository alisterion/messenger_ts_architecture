import {NextFunction, Request, Response} from 'express';
import {UserAuthError, ValidationError} from '../errors';
import {PushService} from '../push/service';
import {Online} from '../socket';
import {ServiceManager} from '../utils';
import {SSOService} from './service/sso.service';
import {AuthService} from './service/user.auth.service';
import {DEFAULT_USER_FIELDS, UserService} from './service/user.service';
import {UserModel} from './user.model';
import {Profile, SSO2FAConfirm, SSO2FARequest, SSOAuthUser, SSORegisterUser} from './user.type';

export class UserController {
    private ssoService: SSOService;
    private userService: UserService;
    private authService: AuthService;
    private online: Online;

    constructor(serviceManager: ServiceManager) {
        this.ssoService = serviceManager.get('user.sso.service');
        this.userService = serviceManager.get('user.service');
        this.authService = serviceManager.get('user.auth.service');
        this.online = serviceManager.get('socket.online.service');
    }

    public async auth(req: Request, res: Response, next: NextFunction) {

    }

    public async register(req: Request, res: Response, next: NextFunction) {


    }

    public async request_2fa(req: Request, res: Response, next: NextFunction) {


    }

    public async confirm_2fa(req: Request, res: Response, next: NextFunction) {


    }

    public async authenticate(req: Request, res: Response, next: NextFunction) {

    }

    public async info(req: Request, res: Response, next: NextFunction) {

    }

    public async contacts(req: Request, res: Response, next: NextFunction) {

    }

    public async myContacts(req: Request, res: Response, next: NextFunction) {

    }

    public async selfProfileUpdate(req: Request, res: Response, next: NextFunction) {

    }

    public async logout(req: Request, res: Response, next: NextFunction) {

    }

    public async search(req: Request, res: Response, next: NextFunction) {

    }

    public async contactAdd(req: Request, res: Response, next: NextFunction) {

    }

    public async contactRemove(req: Request, res: Response, next: NextFunction) {

    }

    private async _updateUserInfo(data: any) {

    }

}
