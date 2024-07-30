const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const ProductSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    old_price: { type: Number, require: true },
    new_price: { type: Number, require: true },
    image: { type: String, require: true },
    categoryID: { type: ObjectId, ref: "category" },
    productType: { type: Number, require: true },
    viewed: { type: Number, require: true },
    status: { type: Boolean, require: true },
    quantity: { type: Number, require: true },
});

module.exports = mongoose.model('product', ProductSchema)