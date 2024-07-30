const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async(name, email, password, age) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new UserModel({ name, email, password: hash, age });
    await user.save();
    return user;
}

const checkUserExits = async(email) => {
    const user = await UserModel.findOne({ email });
    return user ? user : null;
}

// const login = async(email, password) => {
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//         throw new Error('User not found');
//     }

//     const validPassword = bcrypt.compareSync(password, user.password);
//     if (!validPassword) {
//         throw new Error('Invalid password');
//     }

//     return user;
// }
const getAll = async() => {
    const users = await UserModel.find({})
    return users;
}
const login = async(email, password) => {
    const user = await UserModel.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }
    return null;
}
const forgotPassword = async(email) => {
    const user = await UserModel.findOne({ email });
    if (user) {
        const token = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: 5 * 60 });
        user.token_reset_password = token;
        await user.save();
        return token;
    }
    return null;
}
const resetPassword = async(token, password) => {
    const user = await UserModel.findOne({ token_reset_password: token });
    if (user) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
        user.token_reset_password = null;
        await user.save();
        return true;
    }
    return false;
}
module.exports = { resetPassword, forgotPassword, login, getAll, checkUserExits, register }