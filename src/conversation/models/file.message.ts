import {MESSAGE_TYPE} from '../conversation.enum';
import {BaseMessage} from './base.message';
import {FileService} from '../../file/service/file.service';
import {FileDTO} from '../../file/dto/file.dto';

export class FileMessage extends BaseMessage {
    public type: string = MESSAGE_TYPE.FILE;

    private readonly fileId: string;

    constructor(data: {
        fileId: string,
        author: string,
        conversationId: string,
    }) {
        super(data);
        this.fileId = data.fileId;
    }

    public async makeBody(): Promise<any> {
        const file = await FileService.getOneById(this.fileId);
        return FileDTO.toJSON(file);
    }

    public getAdditionalData() {
        return {
            additional: this.fileId,
            additionalModel: 'File',
        };
    }

    public async prepareToSend(): Promise<any> {
        return {
            conversationId: this.conversationId,
            createdAt: this.createdAt,
            id: this.id,
            message: JSON.stringify(await this.makeBody()),
            type: this.type,
        };
    }

}
