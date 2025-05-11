const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.addUser)
router.post('/login', userController.getUserByEmailAndPassword);
router.post('/forgot-password', async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await userController.forgotPassword(email);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});
router.post('/reset-password', async (req, res, next) => {

    try {
        const { resetToken, newPassword } = req.body;

        const result = await userController.resetPassword(resetToken, newPassword);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
});

module.exports = router;