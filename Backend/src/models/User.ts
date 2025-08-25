import { Schema, Types, model } from 'mongoose';


const userSchema = new Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true, index: true },
password: { type: String, required: true },
refreshToken: { type: String, default: null },
}, { timestamps: true });


export type IUser = {
    _id: string | Types.ObjectId;
    name: string;
    email: string;
    password: string;
    refreshToken?: string;
};


export const User = model('User', userSchema);