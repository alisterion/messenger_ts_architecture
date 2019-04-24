import * as Joi from 'joi';

export const CreateConversation = {
    body: {
        participants: Joi.array().items(Joi.string().required()).required(),
        title: Joi.string().required(),
    },
};

export const RemoveOrAddParticipant = {
    body: {
        participants: Joi.array().items(Joi.string().required()).required(),
    },
};

export const CreateDialog = {
    body: {
        participant: Joi.string().required(),
    },
};

export const EditConversation = {
    body: {
        title: Joi.string().required(),
    },
};
