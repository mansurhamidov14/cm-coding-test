export interface IUserService {
    list: IUser[];
    getByCredentials: (credentials: IUserCredentials) => Promise<IUser>;
}

export interface IUserCredentials {
    username: string;
    password: string;
}

export interface IUser extends IUserCredentials {
    firstName: string;
    lastName: string;
    avatarUrl: string;
}
