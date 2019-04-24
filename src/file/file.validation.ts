import * as Joi from 'joi';

export const CreateConversationFile = {
    body: {
        conversationId: Joi.string().required(),
        name: Joi.string().required(),
    },
};
