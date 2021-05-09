import { AbstractRedisClient } from './abstractRedisClient'
import { RedisClient } from 'redis';
import * as jwt from 'jsonwebtoken'
import randtoken from 'rand-token'
import { AUTH_SECRET, TOKEN_EXPIRE_TIME } from '../../../../constant';

interface saveUserProps {
    username: string,
    refreshToken: string,
    accessToken: string,
    xsrfToken: string
}

interface jwtProps {
    email: string,
    username: string,
    userId: string,
    xsrfToken: string
}

export class RedisAuthService extends AbstractRedisClient {

    public jwtHashName: string = 'activeJwtClients';

    constructor(redisClient: RedisClient) {
        super(redisClient);
    }

    //Add to redis information about user : refresh & access token
    public async saveAuthenticatedUser(user: saveUserProps): Promise<void> {
        await this.addToken(user.username, user.refreshToken, user.accessToken, user.xsrfToken);
    }

    public createRefreshToken(): string {
        return randtoken.uid(256) as string;
    }

    public createXsrfToken(): string {
        return randtoken.uid(64) as string;
    }

    public signJWT(props: jwtProps): string {
        const claims = {
            email: props.email,
            username: props.username,
            userId: props.userId,
            xsrfToken: props.xsrfToken
        };

        return jwt.sign(claims, AUTH_SECRET, {
            expiresIn: TOKEN_EXPIRE_TIME
        });
    }

    public decodeJWT(token: string): Promise<object | null> {
        return new Promise((resolve, _) => {
            jwt.verify(token, AUTH_SECRET, (err, decoded: object | any) => {
                if (err) return resolve(null);
                return resolve(decoded);
            });
        })
    }

    private constructKey(username: string, refreshToken: string): string {
        return `refresh-${refreshToken}.${this.jwtHashName}.${username}`
    }

    public addToken(username: string, refreshToken: string, token: string, xsrfToken: string): Promise<any> {
        return this.set(this.constructKey(username, refreshToken), xsrfToken);
    }

    public async getTokens(username: string): Promise<string[]> {
        const keyValues = await this.getAllKeyValue(`*${this.jwtHashName}.${username}`);
        return keyValues.map((kv) => kv.value);
    }

    public async getToken(username: string, refreshToken: string): Promise<string> {
        return this.getOne(this.constructKey(username, refreshToken));
    }
}