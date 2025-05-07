const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
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
        const { userName, email, mobile, password, role } = req.body; 
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ 
            userName, 
            email, 
            mobile, 
            password: hashedPassword, 
            role 
        });
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}