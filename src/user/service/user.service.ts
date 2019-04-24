import {User, UserModel} from '../user.model';

export const DEFAULT_USER_FIELDS = ['id', 'first_name', 'email', 'last_name', 'mobile_number', 'avatar', 'username'];

export class UserService {
    private static readonly _name: string = 'user.service';

    static get name(): string {
        return this._name;
    }

    public async create(data: any): Promise<any> {
        const user = new User(data);
        return user.save();
    }

    public async get(id: any): Promise<any> {
        return User.findById({_id: id})
            .populate('contacts', 'email first_name last_name avatar mobile_number username lastActivity')
            .populate('bots', 'email first_name last_name avatar mobile_number username');
    }

    public async getOne(data: any): Promise<any> {
        return User.findOne(data);
    }

    public async update(id: any, data: any): Promise<any> {
        return User.update({_id: id}, data);
    }

    public async getUserContacts(id: string) {
        const user = await this.get(id);
        return user.contacts;
    }

    public async filter(data: any, fields: Array<string> = DEFAULT_USER_FIELDS, limit: number = 0): Promise<any> {
        const qs = User.find(data).select(fields);
        if (limit > 0) {
            return qs.limit(limit);
        }
        return qs;
    }

    public async getDefaultContacts(): Promise<any> {
        return User.find({isDefault: true});
    }

    public async updateLastActivity(userId: string): Promise<any> {
        return this.update(userId, {lastActivity: new Date()});
    }

}
