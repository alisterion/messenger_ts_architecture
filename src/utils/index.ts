export {Pagination} from './pagination';
export {RSASecurity} from './secyrity';
export {AESSecurity} from './aes.security';
export {SocketEmitter} from './socket.emitter';
export {ServiceManager} from './service.manager';

export const isObject = (instance: any) => {
    return (!!instance) && (instance.constructor === Object);
};
