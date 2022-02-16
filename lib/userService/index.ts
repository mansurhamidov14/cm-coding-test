import { mockUsers } from "./mocks";
import { IUser, IUserCredentials, IUserService } from "./models";

class UserService implements IUserService {
    public list: IUser[];

    constructor () {
        this.list = mockUsers;
    }

    public getByCredentials = (credentials: IUserCredentials): Promise<IUser> => {
        const user = this.list.find(user => user.username === credentials.username && user.password === credentials.password);
        if (user) {
            return Promise.resolve(user);
        } else {
            return Promise.reject('Invalid credentials');
        }
    }
}

export default new UserService();
