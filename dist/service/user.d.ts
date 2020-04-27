import { IUserService, IUserOptions, IUserResult } from '../interface';
export declare class UserService implements IUserService {
    getUser(options: IUserOptions): Promise<IUserResult>;
}
