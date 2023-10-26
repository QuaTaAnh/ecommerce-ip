import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
        trim: true
    }, 
    email: {
        type: String, 
        require: true,
        unique: true 
    },
    password: {
        type: String, 
        require: true,
    },
    phoneNumber: {
        type: String, 
        require: true,
    }, 
    avatar: {
        type: String, 
    }, 
    address: {
        type: {}, 
        require: true,
    }, 
    role: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

export default mongoose.model('users', userSchema)