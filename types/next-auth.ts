import { IUser } from "../lib/userService/models";

declare module "next-auth" {
    interface User extends IUser {}
    interface Session {
        user: IUser;
    }
}