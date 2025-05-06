const User = require('../models/userModel');

exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const user = await User.findOne(req.body);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const token = generateToken(user._id);
        res.status(200).json({
            username: user.userName,
            role: user.role,
            token: token,
            id: user._id
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.addUser = async (req, res) => {
    try {
        User.create(req.body);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}