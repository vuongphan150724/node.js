const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId


const UserSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    age: { type: Number, require: true, default: 0 },
    // token dungf 1 laanf duy nhaats cos gioiws hanj thoiwf gian
    token_reset_password: { type: String, require: false, default: null },
});

module.exports = mongoose.model('user', UserSchema)