import * as fs from 'fs';
import {extname, join, resolve} from 'path';
import {File} from '../models/file.model';

export const FILE_ROOT = '/upload';
export const MEDIA_PATH = resolve(join(__dirname, '../../../../media/'));
export const MEDIA_URL = '/public';

export class FileService {

    static get name(): string {
        return this._name;
    }

    public static async getOneById(id: string) {
        return File.findById(id);
    }

    private static _name: string = 'file.service';

    public async create(data: { conversation: string, owner: string, name: string }) {
        return File.create({...data});
    }

    public async update(id: string, data: { status: string, size?: string, path?: string, url?: string }) {
        return File.update({_id: id}, data);
    }

    public async upload(data: { tempFilePath: string, conversation: string, owner: string, fileId: string }) {

    }

}
