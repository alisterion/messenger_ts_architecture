import * as mongoose from 'mongoose';

export const pushSchema = new mongoose.Schema({
    device: {
        required: true,
        type: String,
    },
    token: {
        required: true,
        type: String,
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    voIpToken: {
        type: String,
    },

}, {
    timestamps: true,
    usePushEach: true,
});

export const Push = mongoose.model('Push', pushSchema);

export interface PushModel {
    device: string;
    token: string;
    user: object;
}
