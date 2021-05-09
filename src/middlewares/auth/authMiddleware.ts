import { Request, Response, NextFunction } from 'express'
import { RedisAuthService } from '../../modules/user/services/redis/redisAuthService'

export class AuthMiddleware {
    private authService: RedisAuthService;

    constructor(authService: RedisAuthService) {
        this.authService = authService
    }

    public async checkCredentials(req: Request, res: Response, next: NextFunction) {
        try {

            const { cookies, headers } = req;

            /* On vérifie que le JWT est présent dans les cookies de la requête */
            if (!cookies || !cookies.access_token) {
                return res.status(401).json({ message: 'Missing token in cookie' });
            }

            const accessToken = cookies.access_token;

            console.log('access token', accessToken);

            /* On vérifie que le token CSRF est présent dans les en-têtes de la requête */
            if (!headers || !headers['x-xsrf-token']) {
                return res.status(401).json({ message: 'Missing XSRF token in headers' });
            }

            const xsrfToken = headers['x-xsrf-token'];

            console.log('xsrfToken', xsrfToken);

            /* On vérifie et décode le JWT à l'aide du secret et de l'algorithme utilisé pour le générer */

            const decodedToken = await this.authService.decodeJWT(accessToken);

            //TODO 
            if (!decodedToken) {
                return res.status(403).json({ message: 'Token signature expired' })
            }

            const { username } = decodedToken;

            // //TODO check if token exists on our redis database
            const redisUserXsrfToken = await this.authService.getTokens(username);

            console.log(redisUserXsrfToken);

            // /* On vérifie que le token CSRF correspond à celui présent dans le JWT  */
            // if (xsrfToken !== redisUserXsrfToken[0]) {
            //     return res.status(401).json({ message: 'Bad xsrf token' });
            // }

            if (redisUserXsrfToken.length !== 0) {
                req.user = decodedToken
                return next();
            } else {
                return next();
            }
        }
        catch (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token' })
        }
    }

}