import { User } from "./models/User";

export class UserState {
    static getUser(): User | undefined {
        const user = localStorage.getItem("UserState");
        if (user != null && user.length > 10) {
            return JSON.parse(user) as User
        } else {
            return undefined
        }
    }
}