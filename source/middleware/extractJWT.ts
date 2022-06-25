import { Request, Response, NextFunction } from 'express';
import logging from '../config/logging';
import JWT from 'jsonwebtoken';
import config from '../config/config';
import User from '../models/user';
const NAMESPACE = 'Auth';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        JWT.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};
const requireSignin = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Validating Token');

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        JWT.verify(token, config.server.token.secret, (error, decoded) => {
            if (error) {
                return res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                req.body.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== 'user') {
        return res.status(400).json({ message: 'User access denied' });
    }
    next();
};

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== 'admin' && req.body.user.role !== 'super-admin') {
        return res.status(400).json({ message: 'error' });
    } else {
        next();
    }
};

const superAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user.role !== 'super-admin') {
        return res.status(200).json({ message: 'Super Admin access denied' });
    }
    next();
};
export default { extractJWT, requireSignin, userMiddleware, adminMiddleware, superAdminMiddleware };
