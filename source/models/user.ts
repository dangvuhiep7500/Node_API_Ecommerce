import mongoose, { Schema } from 'mongoose';
import IUser from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        phoneNumber: { type: String },
        role: {
            type: String,
            enum: ['user', 'admin', 'super-admin'],
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);
UserSchema.set('toJSON', {
    // virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // delete ret._id;
        // delete ret.id;
        delete ret.password;
    }
});
export default mongoose.model<IUser>('User', UserSchema);
