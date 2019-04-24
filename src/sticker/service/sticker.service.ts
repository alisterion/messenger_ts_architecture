import * as jsonDriver from 'jsonfile';
import {join, resolve} from 'path';
import {NotFoundError} from '../../errors';

export const STICKER_ROOT = '/stickers';
export const MEDIA_PATH = resolve(join(__dirname, '../../../../media/'));

export class StickerService {
    private static _name: string = 'sticker.service';

    static get name(): string {
        return this._name;
    }

    public async list(): Promise<any> {

    }

    public async getById(packId: string): Promise<any> {

    }

}
