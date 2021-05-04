import { verify } from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    console.log('AUTH MIDDLEWARE')

    console.log('SESSION : ', req.session);

    console.log('END OF MIDDLEWARE')

    const authorization = req.headers["authorization"];

    if (!authorization) {
        throw new Error("not authenticated");
    }

    next();
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
        throw new Error("not authenticated");
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, 'qsdqsd');
        req.user = payload as any;
    } catch (err) {
        console.log(err);
        throw new Error("not authenticated");
    }

    next();
};