import mongoose from "mongoose";

const productUserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: String, default: false},
},
{
    timestamps: true
});

const ProductUsers = mongoose.models.ProductUser || mongoose.model('ProductUser', productUserSchema);
export default ProductUsers;

