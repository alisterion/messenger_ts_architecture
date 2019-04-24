import * as express from 'express';
import * as validation from 'express-validation';
import {Online} from '../socket';
import {RouterInterface} from '../type';
import {ServiceManager} from '../utils';
import {SSOService} from './service/sso.service';
import {AuthService} from './service/user.auth.service';
import {UserService} from './service/user.service';
import {UserController} from './user.controller';
import {Confirm2FA, Profile, Request2FA, UserAuth, UserRegister} from './user.validation';

export class UserRouter implements RouterInterface {
    public path: string;
    public controller: UserController;

    constructor(manager: ServiceManager) {
        this.path = '/user';

        const ssoService = new SSOService();
        const userService = new UserService();
        const authService = new AuthService();
        const online = new Online();

        manager.register(ssoService, SSOService.name);
        manager.register(userService, UserService.name);
        manager.register(authService, AuthService.name);
        manager.register(online, Online.name);

        this.controller = new UserController(manager);
    }

    public auth(): express.Router {
        const router = express.Router();
        router.post('/auth', validation(UserAuth), this.controller.auth.bind(this.controller));
        return router;
    }

    public register(): express.Router {
        const router = express.Router();
        router.post(`/register`, validation(UserRegister), this.controller.register.bind(this.controller));
        return router;
    }

    public request_2fa(): express.Router {
        const router = express.Router();
        router.post(`/request_2fa`, validation(Request2FA), this.controller.request_2fa.bind(this.controller));
        return router;
    }

    public confirm_2fa(): express.Router {
        const router = express.Router();
        router.post(`/confirm_2fa`, validation(Confirm2FA), this.controller.confirm_2fa.bind(this.controller));
        return router;
    }

    public info(): express.Router {
        const router = express.Router();
        router.get(`/`,
            this.controller.authenticate.bind(this.controller),
            this.controller.info.bind(this.controller));
        return router;
    }

    public contacts(): express.Router {
        const router = express.Router();
        router.get(`/contacts`,
            this.controller.authenticate.bind(this.controller),
            this.controller.contacts.bind(this.controller));
        router.post(`/contacts`,
            this.controller.authenticate.bind(this.controller),
            this.controller.contacts.bind(this.controller));
        return router;
    }

    public myContacts(): express.Router {
        const router = express.Router();
        router.get(`/me/contacts`,
            this.controller.authenticate.bind(this.controller),
            this.controller.myContacts.bind(this.controller));
        return router;
    }

    public selfProfileUpdate(): express.Router {
        const router = express.Router();
        router.post(`/`,
            validation(Profile),
            this.controller.authenticate.bind(this.controller),
            this.controller.selfProfileUpdate.bind(this.controller));
        return router;
    }

    public logout(): express.Router {
        const router = express.Router();
        router.post(`/logout`,
            this.controller.authenticate.bind(this.controller),
            this.controller.logout.bind(this.controller));
        return router;
    }

    public search(): express.Router {
        const router = express.Router();
        router.get(`/search/:term`,
            this.controller.authenticate.bind(this.controller),
            this.controller.search.bind(this.controller));
        return router;
    }

    public contactAdd(): express.Router {
        const router = express.Router();
        router.put(`/contact`,
            this.controller.authenticate.bind(this.controller),
            this.controller.contactAdd.bind(this.controller));
        return router;
    }

    public contactRemove(): express.Router {
        const router = express.Router();
        router.delete(`/contact`,
            this.controller.authenticate.bind(this.controller),
            this.controller.contactRemove.bind(this.controller));
        return router;
    }
}
