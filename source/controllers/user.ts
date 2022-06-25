import { json } from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logging from '../config/logging';
import bcryptjs, { hash } from 'bcryptjs';
import signJWT from '../functions/signJWT';
import User from '../models/user';
const NAMESPACE = 'User Controller';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'Token Vailidated, user authorized');
    return res.status(200).json({
        message: 'Authorized'
    });
};

const resgisterUser = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password, firstName, lastName, phoneNumber, role } = req.body;
    await User.find({ email })
        .exec()
        .then((users) => {
            if (users.length !== 0) {
                return res.status(409).json({
                    message: 'That username is taken. Try another'
                });
            }
            bcryptjs.hash(password, 10, (hashError, hash) => {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }
                const _user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email,
                    password: hash,
                    // email,
                    firstName,
                    lastName,
                    phoneNumber,
                    role
                });

                return _user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ message: error.message, error }));
            });
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    let { email, password } = req.body;
    await User.find({ email })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: "Counldn't find your Account"
                });
            } else {
                bcryptjs.compare(password, users[0].password, (error, result) => {
                    if (error) {
                        logging.error(NAMESPACE, error.message, error);
                        return res.status(401).json({
                            message: 'Unauthorized'
                        });
                    }
                    if (result) {
                        signJWT(users[0], (_error, token) => {
                            if (_error) {
                                logging.error(NAMESPACE, 'Nnable to sign token', _error);

                                return res.status(401).json({
                                    message: 'Unauthorized',
                                    error: _error
                                });
                            } else if (token) {
                                return res.status(200).json({
                                    message: 'Logged in successfully',
                                    token,
                                    user: users[0]
                                });
                            }
                        });
                    } else {
                        return res.status(401).json({ message: 'Wrong password. Try again or click Forgot password to reset it.' });
                    }
                });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

const readUserId = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    return await User.findById(userId)
        .exec()
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'Not Found' })))
        .catch((error) => res.status(500).json({ error }));
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    let { password } = req.body;
    return await User.findByIdAndUpdate(userId)
        .exec()
        .then((user) => {
            if (user) {
                bcryptjs.hash(password, 10, (hashError, hash) => {
                    if (hashError) {
                        return res.status(500).json({
                            message: hashError.message,
                            error: hashError
                        });
                    }
                    const _user = user.set({
                        password: hash
                    });
                    return _user
                        .save()
                        .then((user) => res.status(201).json({ user, message: 'Updated successfully' }))
                        .catch((error) => res.status(500).json({ message: error.message, error }));
                });
            } else {
                return res.status(404).json({ message: 'Not Found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;

    await User.findByIdAndDelete(userId)
        .exec()
        .then((user) => {
            if (user) {
                return res.status(201).json({
                    user,
                    message: 'Deleted successfully'
                });
            } else {
                return res.status(404).json({
                    user,
                    message: 'Not Found'
                });
            }
        })
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    await User.find()
        .select('-password')
        .exec()
        .then((users) =>
            res.status(200).json(
                users,
                // count: users.length
            )
        )
        .catch((error) => res.status(500).json({ message: error.message, error }));
};

export default { validateToken, resgisterUser, loginUser, updateUser, getAllUsers, readUserId, deleteUser };
