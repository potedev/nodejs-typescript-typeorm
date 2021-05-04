import { User } from './user'

export interface IUserRepo {
    exists(userId: string): Promise<boolean>;
    save(user: User): Promise<void>;
    getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User>
}

export class UserRepo implements IUserRepo {
    private entities: any

    constructor(entities: any) {
        this.entities = entities
        console.log('user repo entities', entities);
    }

    public async exists(username: string): Promise<boolean> {
        const UserEntity = this.entities.User;

        const result = await UserEntity.findOne({ username: username })

        return !!result === true;
    }

    public async getUserByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
        const UserEntity = this.entities.User;

        console.log('repo username or email:', usernameOrEmail);

        const user = await UserEntity.find({
            where: usernameOrEmail.includes('@')
                ? { "email": usernameOrEmail }
                : { "username": usernameOrEmail }
        });

        const found = user.length > 0
        if (!found) throw new Error("User not found");

        console.log('found user', user);

        return user[0]
    }

    async save(user: User): Promise<void> {

        const UserEntity = this.entities.User;

        console.log('TYPE OF USER', typeof user);

        const exists = await this.exists(user.username);

        console.log('USER ALREADY EXIST ?', exists);

        if (!exists) {
            UserEntity.save(user)
        }

        return;
    }
}