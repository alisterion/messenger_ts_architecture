import {MESSAGE_TYPE} from '../conversation.enum';
import {BaseMessage} from './base.message';
import {FileMessage} from './file.message';
import {StickerMessage} from './sticker.message';
import {TextMessage} from './text.message';

export class MessageFactory {
    public static createMessage(type: object): BaseMessage;
    public static createMessage(type: MESSAGE_TYPE.TEXT): TextMessage;
    public static createMessage(type: MESSAGE_TYPE.STICKER): StickerMessage;
    public static createMessage(type: MESSAGE_TYPE.FILE): FileMessage;

    public static createMessage(options: any):
        TextMessage |
        StickerMessage |
        FileMessage {
        switch (options.type) {
            case MESSAGE_TYPE.TEXT:
                return new TextMessage(options.data);
            case MESSAGE_TYPE.STICKER:
                return new StickerMessage(options.data);
            case MESSAGE_TYPE.FILE:
                return new FileMessage(options.data);
            default:
                throw new Error();
        }

    }
}
