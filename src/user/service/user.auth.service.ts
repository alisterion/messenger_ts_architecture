import * as config from 'config';
import * as jwt from 'jsonwebtoken';

export interface AuthToken {
    id: string;
}

const SECRET = 'gf278237hgshdcjs2362!';

export class AuthService {
    private static readonly _name: string = 'user.auth.service';
    static get name(): string {
        return this._name;
    }

    public process(user: any): string {
        const authTokenDaysLifetime = parseInt(config.get('authTokenLifetime'), 10);
        const payload: AuthToken = {
            id: user.id,
        };
        return jwt.sign(payload, SECRET, {
            expiresIn: 3600 * 24 * authTokenDaysLifetime, // @TODO : add to config
        });
    }

    public verify(data: any) {
        return data;
    }

    public async verifyToken(authToken: string): Promise<AuthToken> {
        return await new Promise((resolve, reject) => {
            jwt.verify(authToken, SECRET, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                return resolve(decoded);
            });
        }) as AuthToken;
    }
}
