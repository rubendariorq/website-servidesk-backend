import { createPool } from 'mysql2/promise';
import keys from './keys';

export async function connect(){
    const connection = await createPool(keys.database);
    return connection;
}