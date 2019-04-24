import * as config from 'config';
import * as rp from 'request-promise';
import {SSO2FAConfirm, SSO2FARequest, SSOAuthUser, SSORegisterUser} from '../user.type';

export class SSOService {
    private static readonly _name: string = 'user.sso.service';

    private readonly url: string;
    private readonly api: string;

    constructor() {
        this.url = config.get('authServer.url');
        this.api = config.get('authServer.version');
    }

    static get name(): string {
        return this._name;
    }

    public async auth(data: SSOAuthUser) {
        const endpoint = '/user/login';
        return this.makeRequest(endpoint, data);
    }

    public async register(data: SSORegisterUser) {
        const endpoint = '/user/register';
        return this.makeRequest(endpoint, data);
    }

    public async request_2fa(data: SSO2FARequest) {
        const endpoint = '/user/login_send_2fa_sms';
        return this.makeRequest(endpoint, data);
    }

    public async confirm_2fa(data: SSO2FAConfirm) {
        const endpoint = '/user/login_2fa';
        return this.makeRequest(endpoint, data);
    }

    private async makeRequest(endpoint: string, data: any) {
        const options = {
            body: {...data},
            json: true,
            method: 'POST',
            uri: `${this.url}${this.api}${endpoint}`,
        };
        return rp(options);
    }

}
