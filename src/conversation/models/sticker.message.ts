import {MESSAGE_TYPE} from '../conversation.enum';
import {BaseMessage} from './base.message';

export class StickerMessage extends BaseMessage {
    public type: string = MESSAGE_TYPE.STICKER;

    private readonly stickerId: string;
    private readonly packId: string;
    private readonly file: string;
    private readonly code: string;

    constructor(data: {
        stickerId: string,
        packId: string,
        author: string,
        conversationId: string,
        file: string,
        code: string,
    }) {
        super(data);
        this.packId = data.packId;
        this.stickerId = data.stickerId;
        this.code = data.code;
        this.file = data.file;
    }

    public async makeBody(): Promise<any> {
        return {
            code: this.code,
            file: this.file,
            packId: this.packId,
            stickerId: this.stickerId,
        };
    }

    public async prepareToSend() {
        return {
            conversationId: this.conversationId,
            createdAt: this.createdAt,
            id: this.id,
            message: JSON.stringify(await this.makeBody()),
            type: this.type,
        };
    }

}
