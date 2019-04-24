import * as Joi from 'joi';

export const CreateCall = {
    body: {
        recipient: Joi.string().required(),
        video: Joi.boolean().default(false),
    },
};
