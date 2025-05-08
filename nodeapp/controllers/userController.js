const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../authUtils')

exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) {
        //     return res.status(400).json({ message: "Incorrect password" });
        // }
        const token = generateToken(user._id);
        return res.status(200).json({
            id: user._id,
            userName: user.userName,
            role: user.role,
            token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addUser = async (req, res) => {
    try {
        // const { userName, email, mobile, password, role } = req.body; 
        // const hashedPassword = await bcrypt.hash(password, 10);
        // await User.create({ 
        //     userName, 
        //     email, 
        //     mobile, 
        //     password: hashedPassword, 
        //     role 
        // });
        await User.create(req?.body);
        res.status(200).json({ message: "Success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}