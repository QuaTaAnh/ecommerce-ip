import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        lowercase: true,
    },
    description: {
        type: String,
        require: true,
    }, 
    category: {
        type: mongoose.ObjectId,
        ref: "Category",
        required: true,
    },
    price: {
        type: Number,
        require: true,
    }, 
    quantity: {
        type: Number,
        require: true,
    },
    image: {
        data: Buffer,
        contentType: String,
      },
    shipping: {
        type: Boolean,
    },
    },
    { timestamps: true }
);

export default mongoose.model('Products', productSchema)
