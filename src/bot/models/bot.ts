import * as crypto from 'crypto';
import * as mongoose from 'mongoose';

export const botSchema = new mongoose.Schema({
    avatar: {
        default: (x: any) => {
            return `https://api.adorable.io/avatars/285/${crypto.randomBytes(8).toString('hex')}.png`;
        },
        type: String,
    },
    email: {type: String, unique: true},
    first_name: {type: String},
    isBot: {type: Boolean, default: true},
    isDefault: {type: Boolean, default: false},
    last_name: {type: String},
    username: {type: String},
}, {
    timestamps: true,
    usePushEach: true,
});

botSchema.options.toJSON = {
    transform: function (doc: any, ret: any, options: any) {
        ret.id = `bot_${ret._id.toString()}`;

        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

export const Bot = mongoose.model('Bot', botSchema);

export type BotModel = mongoose.Document & {
    avatar: string,
    first_name: string,
    last_name: string,
    is_online?: boolean,
};
