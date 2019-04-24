import * as Joi from 'joi';

export const CreatePush = {
    body: {
        device: Joi.string().required(),
        token: Joi.string().required(),
        voIpToken: Joi.string(),
    },
};
