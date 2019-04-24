
// tslint:disable-next-line:interface-over-type-literal
export type SSOAuthUser = {
    email: string,
    password: string,
};

// tslint:disable-next-line:interface-over-type-literal
export type SSORegisterUser = {
    email: string,
    password: string,
    password_confirm: string,
    first_name: string,
    last_name: string,
    mobile_number: string,
};

// tslint:disable-next-line:interface-over-type-literal
export type SSO2FARequest = {
    sessionkey: string,
};

// tslint:disable-next-line:interface-over-type-literal
export type SSO2FAConfirm = {
    sessionkey: string,
    sms_code: string,
};

// tslint:disable-next-line:interface-over-type-literal
export type Profile = {
    first_name: string,
    last_name: string,
    username: string,
};
