import * as mongoose from 'mongoose';
import {MESSAGE_TYPE} from '../conversation.enum';

export const messageSchema = new mongoose.Schema({
    author: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    },
    body: {
        required: true,
        type: String,
    },
    conversationId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    isRead: {
        default: false,
        required: true,
        type: Boolean,
    },
    ogResult: {
        default: [],
        type: Array,
    },
    readBy: {
        default: [],
        type: Array,
    },
    type: {
        default: MESSAGE_TYPE.TEXT,
        enum: Object.values(MESSAGE_TYPE),
        required: true,
        type: String,
    },
    additional: {
        refPath: 'additionalModel',
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    additionalModel: {
        enum: ['File'],
        required: false,
        type: String,
    },
}, {
    timestamps: true,
    usePushEach: true,
});

messageSchema.options.toJSON = {
    transform: (doc: any, ret: any, options: any) => {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

export const Message = mongoose.model('Message', messageSchema);

export interface MessageModel {
    id: object;
    author: object;
    body: string;
    conversationId: string;
    createdAt: string;
    updatedAt: string;
    type: string;
    isRead: boolean;
    readBy: object;
    ogResult: object;

    save(): void;

    send(): void;
}
