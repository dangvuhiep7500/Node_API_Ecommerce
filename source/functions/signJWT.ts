import jwt from 'jsonwebtoken';
import config from '../config/config';
import logging from '../config/logging';
import IUser from '../interfaces/user';

const NAMESPACE = 'Auth';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config.server.token.expireTime) * 100000;
    var expirationTimeInSeconds = Math.floor(expirationTime / 100);

    logging.info(NAMESPACE, `Attemting to sign token for ${user.email}`);
    try {
        jwt.sign(
            {
                _id: user._id,
                // username: user.username,
                role: user.role
            },
            config.server.token.secret,
            {
                issuer: config.server.token.issuer,
                algorithm: 'HS256',
                expiresIn: expirationTimeInSeconds
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: any) {
        logging.error(NAMESPACE, error.message, error);
        callback(error, null);
    }
};

export default signJWT;
