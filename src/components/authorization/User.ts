import UserActions from "@/components/authorization/UserActions";

export default class User implements UserActions{
    name: string | null = null
    email: string | null = null
    loginStatus: boolean | null = null

    model: Function  = () => {}

    constructor(params: { name: string, email: string }) {
        this.name = params.name;
        this.email = params.email;
        this.loginStatus = false
    }

    login(item:User): void {
        this.loginStatus = true
    }

    logout(item:User): void {
        this.loginStatus = false
    }



}