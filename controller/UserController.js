const UserService = require('../services/UserServices');
const mailer = require('nodemailer');
const getConstants = require('../helpers/constants').getConstants;
const jwt = require('jsonwebtoken');

const register = async(name, email, password, age, confirm_password) => {
    const isExits = await UserService.checkUserExits(email);
    if (isExits) {
        throw new Error("email da ton tai");
    }
    if (password !== confirm_password) {
        throw new Error('Mật khẩu không khớp!');
    }
    const user = await UserService.register(name, email, password, age);
    return user;
};

const login = async(email, password) => {
    const user = await UserService.login(email, password);
    return user;
};
const getAll = async() => {
    const users = await UserService.getAll();
    return users;

}
const forgotPassword = async(email) => {
    const token = await UserService.forgotPassword(email);
    if (token) {
        const mailOptions = {
            from: getConstants().MAIL,
            to: email,
            subject: 'Reset password',
            html: `<a href="http://127.0.0.1:5500/ES6/reset-password.html?token=${token}">Reset password</a>`
        };
        await transporter.sendMail(mailOptions)
        return true;
    }
    return false;
}
const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: getConstants().MAIL,
        pass: getConstants().APP_PASSWORD
    },
});

const resetPassword = async(token, password, confirm_password) => {
    if (password !== confirm_password) {
        throw new Error('mat khau va xac nhan mat khau ko trung khop');
    }
    const data = jwt.verify(token, 'shhhhh');
    if (data && data.id) {
        const result = await UserService.resetPassword(token, password);
        return result;
    }
    return false;
}
module.exports = { register, login, getAll, forgotPassword, resetPassword };