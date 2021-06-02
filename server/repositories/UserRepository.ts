import { User } from "../entities/users";
import { Repository } from "./Repository";

export class UserRepository extends Repository<User>{
    constructor() {
        super('users');
    }
    findByEmail(email: string) {
        return this.findByField<string>('email', email);
    }
}
