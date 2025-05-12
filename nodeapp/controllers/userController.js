const bcrypt = require('bcrypt');
const validator = require('validator');
const User = require('../models/userModel');
const { generateToken } = require('../authUtils')
const transport = require('../mailTransport');
const jwt = require('jsonwebtoken')
require('dotenv').config();
const { resetToken } = require('../authUtils')
const createError = require('http-errors')

exports.getUserByEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
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
        const { userName, email, mobile, password, role } = req.body;

        if (!userName || !validator.isAlphanumeric(userName.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid username format" });
        }
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!mobile || !validator.isMobilePhone(mobile, 'any')) {
            return res.status(400).json({ message: "Invalid mobile number format" });
        }
        if (!password || password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        if (!role || !validator.isAlpha(role)) {
            return res.status(400).json({ message: "Invalid role format" });
        }

        await User.create({
            userName,
            email,
            mobile,
            password,
            role
        });

        res.status(200).json({ message: "Success" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.forgotPassword = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw createError(404, `No user found with EMAIL ID: ${email}`);
    const payload = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
    }
    const token = resetToken(payload);
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
    await user.save();
    await transport.sendMail({
        from: `"HireFlow" <${process.env.EMAIL_USER}`,
        to: email,
        subject: 'Password Reset Request',
        html:`
        <div style="font-family: Arial, sans-serif; margin: auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); background: #ffffff;">
    <div>
        <img src="https://tinyurl.com/mr3u3ah9" alt="HireFlow Logo" style="width: 100%; max-height: 120px; object-fit: contain;">
    </div>

    <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
    
    <p style="color: #555; font-size: 16px; ">
        <strong>Dear ${user.userName},</strong><br>
        We received a request to reset your password. If you didn't make this request, simply ignore this email.<br>
        Otherwise, click the button below to reset your password:
    </p>

    <div style="text-align: center; margin-top: 20px;">
        <a href="${process.env.CLIENT_URL}/resetPassword/${token}" 
            style="background: linear-gradient(45deg, rgb(220, 197, 245), rgb(107, 107, 236), royalblue);
            padding: 12px 25px; color: white; font-size: 18px; font-weight: bold; border-radius: 25px;
            text-decoration: none; display: inline-block; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            Reset Password
        </a>
    </div>

    <p style="color: #777; font-size: 14px; text-align: center; margin-top: 20px;">
        If you're experiencing any issues, feel free to contact our support team.
    </p>
</div>
        `
    });
    return { message: 'Password reset link sent' }
};

exports.resetPassword = async (resetToken, newPassword) => {
    const decoded = jwt.verify(resetToken, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id)
    if (!user) throw createError(400, 'Invalid token');
    if (Date.now() > user.resetTokenExpiry) throw createError(400, 'Token expired');
    user.password = newPassword;
    user.resetToken = undefined;
    await user.save(); return { message: 'Password reset successful!' };

};

exports.updateUser = async (req, res) => {
    try {
        const { name, email, mobile } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { userName: name, email, mobile },
            { new: true }
        );
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};