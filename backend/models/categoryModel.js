import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true,
        trim: true
    },
    type: {
        type: String, 
        require: true,
    },
    image: {
        type: String,
    },
    slug: {
        type: String,
        lowercase: true,
    },
})

export default mongoose.model('Category', categorySchema)