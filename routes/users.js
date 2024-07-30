var express = require('express');
var router = express.Router();
const UserController = require('../controller/UserController');
const jwt = require('jsonwebtoken');

/* POST register user. */
router.post('/api/register', async function(req, res, next) {
    try {
        const { name, email, password, age, confirm_password } = req.body; // Sửa 'reg' thành 'req'

        const user = await UserController.register(name, email, password, age, confirm_password); // Sửa 'emial' thành 'email'
        res.status(200).json({ user });
    } catch (error) {
        console.log(error);
        res.status(414).json({ error: error.message });
    }
});

router.get('/api/register', async function(req, res, next) {
    try {
        const result = await UserController.getAll();
        res.status(200).json({ data: result });
    } catch (error) {
        res.status(414).json({ error: error.message });
    }
})
router.post('/api/login', async function(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await UserController.login(email, password);
        if (user) {
            const access_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 1 * 60 });
            const refresh_token = jwt.sign({ user }, 'shhhhh', { expiresIn: 90 * 60 * 24 * 60 });
            res.status(200).json({ user, access_token, refresh_token });
        } else {
            res.status(401).json({ error: ' sai email hoac mat khau' });
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});
router.post('/api/refresh-token', async function(req, res, next) {
    try {
        let { refresh_token } = req.body;
        const data = jwt.verify(refresh_token, 'shhhhh');
        const access_token = jwt.sign({ user: data.user }, 'shhhhh', { expiresIn: 1 * 60 });
        refresh_token = jwt.sign({ user: data.user }, 'shhhhh', { expiresIn: 90 * 60 * 24 * 60 });
        res.status(200).json({ user: data.user, access_token, refresh_token });

    } catch (error) {
        res.status(414).json({ error: error.message });
    }
})

router.post('/api/forgot-password', async function(req, res, next) {
    try {
        const { email } = req.body;
        const response = await UserController.forgotPassword(email);
        res.status(200).json({ status: response });
    } catch (error) {
        console.log(error);
        res.status(414).json({ error: error.message });
    }
});
router.post('/api/reset-password', async function(req, res, next) {
    try {
        const { password, password_confirmation, token } = req.body;
        const response = await UserController.resetPassword(token, password, password_confirmation);
        res.status(200).json({ status: response });
    } catch (error) {
        console.log(error);
        res.status(414).json({ error: error.message });
    }
});
module.exports = router;