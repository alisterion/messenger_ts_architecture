import * as mongoose from 'mongoose';
import {CALL_STATUS} from './call.enum';

export const callSchema = new mongoose.Schema({
    audio: {type: Boolean, default: true},
    caller: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    duration: {type: Number},
    endedAt: {type: Date},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    startedAt: {type: Date},
    status: {type: String, enum: Object.keys(CALL_STATUS), default: CALL_STATUS.CREATED},
    video: {type: Boolean, default: false},
}, {
    timestamps: true,
    usePushEach: true,
});

callSchema.options.toJSON = {
    transform: (doc: any, ret: any, options: any) => {
        ret.id = ret._id.toString();

        delete ret._id;
        delete ret.__v;
        return ret;
    },
};

export const Call = mongoose.model('Call', callSchema);

export interface CallHistoryModel {
    type: string;
    from?: string;
    to?: string;
    date: Date;
    status: string;
    duration: string;
}
