import * as mongoose from 'mongoose';
import {FILE_STATUS} from '../file.enum';

export const fileSchema = new mongoose.Schema({
    conversation: {type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true},
    name: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    path: {type: String},
    size: {type: String},
    status: {type: String, enum: Object.keys(FILE_STATUS), default: FILE_STATUS.CREATED},
    url: {type: String},
}, {
    timestamps: true,
    usePushEach: true,
});

export const File = mongoose.model('File', fileSchema);

export interface FileModel {
    id: string;
    conversation: string;
    name: string;
    owner: object;
    size?: string;
    status: string;
    path?: string;
    url?: string;
}
