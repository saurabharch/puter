import BaseService from '../BaseService.js';
import { DB_READ } from '../database/consts.js';
import { DBKVStore } from './DBKVStore.mjs';

export class DBKVService extends BaseService {
    kvStore = undefined;
    _init() {
        /** @type {DBKVStore} */
        this.kvStore = new DBKVStore(this.services.get('database').get(DB_READ, 'kvstore'));
    }
    static IMPLEMENTS = {
        ['puter-kvstore']: Object.getOwnPropertyNames(DBKVStore.prototype)
            .filter(n => n !== 'constructor')
            .reduce((acc, fn) => ({
                ...acc,
                [fn]: async function(...a) {
                    return await this.kvStore[fn](...a);
                },
            }), {}),
    };

}