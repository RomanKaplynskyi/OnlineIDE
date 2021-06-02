import { IRepository } from "./interfaces";
import Users from "../models/users";
import Tokens from "../models/tokens"

export class MongoRepository<T> implements IRepository<T>{
    tableName: string
    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async findByField<K>(fieldName: string, field: K): Promise<any>{
        return Users.findOne({ fieldName: field });
    }

    async saveEntity(entity: T): Promise<T> {
        if(this.tableName === 'users'){
            const newUser = new Users(entity);
            await newUser.save();
            return entity;
        } else {
            const newToken = new Tokens(entity);
            await newToken.save();
            return entity;
        }
    }

    findAllByField<K>(fieldName: string, field: K | null): Promise<Array<T>> {
        return Promise.resolve([])
    }
}
