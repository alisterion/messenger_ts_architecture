import * as Joi from 'joi';

export const UserAuth = {
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    },
};

export const UserRegister = {
    body: {
        email: Joi.string().required(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        mobile_number: Joi.string().required(),
        password: Joi.string().required(),
        password_confirm: Joi.string().required(),
    },
};

export const Request2FA = {
    body: {
        sessionkey: Joi.string().required(),
    },
};

export const Confirm2FA = {
    body: {
        sessionkey: Joi.string().required(),
        sms_code: Joi.string().required(),
    },
};

export const Profile = {
    body: {
        first_name: Joi.string(),
        last_name: Joi.string(),
        username: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).options({
            language: {
                string: {
                    regex: {
                        base: 'Allow only characters and numbers.',
                    },
                },
            },
        }),
    },
    options: {
        allowUnknownBody: false,
    },
};
