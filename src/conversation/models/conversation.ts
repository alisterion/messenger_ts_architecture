import * as mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
    isDialog: {
        default: false,
        type: Boolean,
    },
    lastMessage: {
        ref: 'Message',
        required: false,
        type: mongoose.Schema.Types.ObjectId,
    },
    owner: {
        ref: 'User',
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    },
    participants: [{
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
    }],
    title: {
        default: '',
        type: String,
    },
    unreadCount: {
        default: {},
        type: mongoose.Schema.Types.Mixed,
    },
}, {
    timestamps: true,
    usePushEach: true,
});

export const Conversation = mongoose.model('Conversation', ConversationSchema);

export interface ConversationModel {
    id: string;
    owner: string;
    title: string;
    participants: Array<object>;
    lastMessage: any;
    updatedAt: string;
    isDialog: boolean;
    unreadCount: number;
}
