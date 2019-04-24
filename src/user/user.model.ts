import * as bcrypt from 'bcrypt-nodejs';
import * as mongoose from 'mongoose';
import {BotService} from '../bot/services';
import {UserService} from './service/user.service';

export const userSchema = new mongoose.Schema({
    avatar: String,
    bots: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bot', default: []}],
    contacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    deletedContacts: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', default: []}],
    email: {type: String, unique: true},
    first_name: {type: String},
    isDefault: {type: Boolean, default: false},
    lastActivity: {type: Date},
    last_name: {type: String},
    mobile_number: {type: String, unique: true},
    password: String,
    passwordResetExpires: Date,
    passwordResetToken: String,
    username: {type: String, unique: true},

    profile: {
        gender: String,
        location: String,
        name: String,
        picture: String,
        website: String,
    },
}, {
    timestamps: true,
    usePushEach: true,
});

userSchema.options.toJSON = {
    transform: function (doc: any, ret: any, options: any) {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
        delete ret.password;
        return ret;
    },
};

/**
 * Password hash middleware.
 */
userSchema.pre('save', async function save(next) {
    const user = this;

    if (user.isNew) {
        const bot = await new BotService().getDefaultBot();
        user.bots.push(bot._id);

        const contacts = await new UserService().getDefaultContacts();
        user.contacts = [...contacts.map((x: any) => x._id.toString())];

    }

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, undefined, (error: mongoose.Error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

export const User = mongoose.model('User', userSchema);

export type UserModel = mongoose.Document & {
    avatar: string,
    contacts?: Array<UserModel>,
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    mobile_number: string,
    lastActivity: string,
    is_online?: boolean,

};
