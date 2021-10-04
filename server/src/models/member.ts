import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import IMember from '../types/types'


// Create Schema
const memberSchema = new Schema<IMember>({
    _id: Schema.Types.ObjectId,
    username: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [8, 'Your password must be longer than 8 characters']
    },
    // avatar: {
    //     public_id: {
    //         type: String,
    //         required: false
    //     },
    //     url: {
    //         type: String,
    //         required: false
    //     }
    // },
    imagePath: {
        type: String,
        // required: true
    },
    role: {
        type: String,
        enum: ['member'],
        default: 'member',
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },

    lastLoginDate: {
        type: Date,
        default: Date.now,
    },
    // tweets: [{
    //     type: Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Tweet"
    // }]
});

// Encrypting password before saving user
memberSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password, 10);
})

//Return JWT token
memberSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//Compare user password
memberSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {

    return await bcrypt.compare(enteredPassword, this.password);
};


export default model<IMember>('Member', memberSchema);