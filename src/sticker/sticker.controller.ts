import {NextFunction, Request, Response} from 'express';
import {ServiceManager} from '../utils';
import {StickerService} from './service';

export class StickerController {
    private stickerService: StickerService;

    constructor(serviceManager: ServiceManager) {
        this.stickerService = serviceManager.get(StickerService.name);
    }

    public async packs(req: Request, res: Response, next: NextFunction) {
        const packs = await this.stickerService.list();
        res.json(packs);
    }

    public async pack(req: Request, res: Response, next: NextFunction) {
        const packId = req.params.packId;
        const pack = await this.stickerService.getById(packId);
        res.json(pack);
    }

}
