import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
    _id: any;
    name:string;
    email:string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface IUserDocument extends Document  {
    id: any;
    name:string;
    email:string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const UserModel = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        dafault: Date.now,
        required: false

    },
    updatedAt: {
        type: Date,
        dafault: Date.now,
        required: false
    }
})

const model = mongoose.model('User', UserModel)

export default model