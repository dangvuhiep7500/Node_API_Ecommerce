import { Document } from 'mongoose';
export default interface IUser extends Document {
    // username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    role: string;
}
