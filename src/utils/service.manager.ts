import * as winston from 'winston';

export class ServiceManager {
    public readonly app: any;
    public services: any = {};

    constructor(app: any) {
        this.app = app;
    }

    public register(service: any, name: string) {
        if (!this.services[name]) {
            winston.info(`\tRegister service |\t${name}`);
            this.services[name] = service;
        }
    }

    public get(name: string) {
        return this.services[name];
    }
}
