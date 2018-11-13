import * as Express from 'express';
import * as admin from 'firebase-admin';
import {Middleware} from '@decorators/express';

export class Auth implements Middleware {

    async use(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        if (req.header('Authorization')) {

            try {
                res.locals.user = await admin.auth().verifyIdToken(req.header('Authorization'));
                next();
            } catch (err) {
                res.status(401).json(err);
            }

        } else {
            res.status(401).json({error: 'Authorization header is not found'});
        }
    }
}