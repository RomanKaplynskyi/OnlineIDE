import {IRepository} from "./interfaces";
import postgresDB from "../databases/postgres-db";


export class PGRepository<T> implements IRepository<T> {
    tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName;
    }
    async findByField<K>(fieldName: string, field: K): Promise<T> {
        const query : string = `select * from ${this.tableName} where ("${fieldName}" = $1)`
        console.log([query, fieldName, field])
        const { rows } = await postgresDB.query(query, [field]);
        return rows[0];
    }

    async findAllByField<K>(fieldName: string, field: K | null): Promise<Array<T>> {
        const query : string = `select * from ${this.tableName} where ("${fieldName}" = $1)`
        console.log([query, fieldName, field])
        const { rows } = await postgresDB.query(query, [field]);
        return rows;
    }

    async saveEntity(entity: T): Promise<T> {
        const cols : string = Object.keys(entity).filter(col => col !== 'ID').map(col => `"${col}"`).join(',')
        const indexes : string = Object.keys(entity).map((f,index) => '$' + (index + 1)).join(',')
        const sql = `insert into ${this.tableName} (${cols}) values (${indexes}) RETURNING *`;
        console.log([sql, cols])
        const {rows} = await postgresDB.query(sql, [...Object.values(entity)]);
        return rows[0];
    }
}