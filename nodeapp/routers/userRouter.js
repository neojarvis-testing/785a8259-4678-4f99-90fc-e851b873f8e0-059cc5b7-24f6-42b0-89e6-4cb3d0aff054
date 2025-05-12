const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.addUser)
router.post('/login', userController.getUserByEmailAndPassword);
// router.post('/forgot-password', async (req, res, next) => {
//     try {
//         const { email } = req.body;
//         const result = await userController.forgotPassword(email);
//         res.status(200).json(result);
//     } catch (err) {
//         next(err);
//     }
// });
router.post('/forgot-password', async (req, res, next) => {
    try {
        let { email } = req.body;

        // Validate email format before passing it to controller
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Sanitize email before using in queries
        email = sanitizeHtml(email.trim().toLowerCase());

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
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
module.exports = router;