import User from "@/components/authorization/User";

export default interface UserActions {
    login(item:User): void
    logout(item:User): void
}