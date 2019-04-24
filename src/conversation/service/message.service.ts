import {Conversation, Message} from '../models';
import * as mongoose from 'mongoose';
import {MESSAGE_TYPE} from '../conversation.enum';

export class MessageService {
    private static _name: string = 'conversation.message.service';

    static get name(): string {
        return this._name;
    }

    public async getOneById(id: string): Promise<any> {
        return Message.findById(id);
    }

    public async findOne(data: any): Promise<any> {
        return Message.findOne(data);
    }

    public async find(data: any): Promise<any> {
        return Message.find(data);
    }

    public async create(data: any): Promise<any> {
        return Message.create(data);
    }

    public async update(id: string, data: any) {
        const message = await this.getOneById(id);

        for (const k of Object.keys(data)) {
            message[k] = data[k];
        }

        return message.save();
    }

    public async getCountOfUnreadConversation(userId: string) {
        const myConversations = await Conversation.find({
            participants: {
                $in: [mongoose.Types.ObjectId(userId)],
            },
        });
        const myConversationsId = myConversations.map((x) => x._id);
        return Message.aggregate(
            [{
                $match: {
                    author: {$ne: mongoose.Types.ObjectId(userId)},
                    conversationId: {$in: myConversationsId},
                    readBy: {
                        $nin: [userId],
                    },
                    type: {$in: [MESSAGE_TYPE.TEXT, MESSAGE_TYPE.FILE, MESSAGE_TYPE.IMAGE]},
                },
            },
                {
                    $group: {
                        _id: '$conversationId',
                        unreadCount: {
                            $sum: 1,
                        },
                    },
                },
            ],
        );
    }
}
