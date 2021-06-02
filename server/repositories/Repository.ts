import { PGRepository } from "./PGRepository";

import { MongoRepository } from "./MongoRepository";

import { GetDBType } from "../Utils/Utils";

import { IRepository } from "./interfaces";

const DBTYPE = GetDBType()

export class Repository<T> implements IRepository<T>{
    Repository: IRepository<T>
    constructor(tableName: string) {
        switch (DBTYPE) {
            case 'postgres':
                this.Repository = new PGRepository<T>(tableName)
                break
            case 'mongoDB':
                this.Repository = new MongoRepository<T>(tableName)
                break
        }
    }

    findByField<K>(fieldName: string, field: K): Promise<T> {
        return this.Repository.findByField<K>(fieldName, field)
    }

    saveEntity(entity: T): Promise<T> {
        return this.Repository.saveEntity(entity)
    }

    findAllByField<K>(fieldName: string, field: K | null) : Promise<Array<T>> {
        return this.Repository.findAllByField(fieldName, field)
    }
}
