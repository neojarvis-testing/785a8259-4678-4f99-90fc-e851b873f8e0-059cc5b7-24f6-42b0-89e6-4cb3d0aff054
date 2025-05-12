const bcrypt = require('bcrypt');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
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

        // Validate input securely
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Weak password: Ensure it meets security standards" });
        }

        // Sanitize email without injecting it into queries
        const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase());

        // Find user securely using a parameterized query
        const user = await User.findOne({ email: sanitizedEmail }).lean();

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Verify password using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate secure authentication token
        const token = generateToken(user._id);

        return res.status(200).json({
            id: user._id,
            userName: user.userName,
            role: user.role,
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.addUser = async (req, res) => {
    try {
        const { userName, email, mobile, password, role } = req.body;

        // Validate inputs securely
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
        if (!role || !["admin", "user"].includes(role.toLowerCase())) {
            return res.status(400).json({ message: "Invalid role assignment" });
        }

        // Sanitize user input
        const sanitizedUser = {
            userName: sanitizeHtml(userName),
            email: sanitizeHtml(email),
            mobile: sanitizeHtml(mobile),
            role: sanitizeHtml(role)
        };

        // Hash password before storing
        sanitizedUser.password = await bcrypt.hash(password, 10);

        // Create new user securely
        const user = new User(sanitizedUser);
        await user.save();

        res.status(201).json({ message: "User added successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
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
    try {
        // Validate and sanitize the email properly before using it in queries
        if (!validator.isEmail(email)) {
            throw createError(400, "Invalid email format");
        }
        const sanitizedEmail = sanitizeHtml(email.trim().toLowerCase());

        // Find user securely without exposing raw email in queries
        const user = await User.findOne({ email: sanitizedEmail });
        if (!user) throw createError(404, "No user found with the provided email.");

        // Generate reset token securely
        const payload = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
        };
        const token = resetToken(payload);

        // Store the reset token securely in the user's document
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 15 * 60 * 1000;
        await user.save();

        // Send password reset email
        await transport.sendMail({
            from: `"HireFlow" <${process.env.EMAIL_USER}>`,
            to: sanitizedEmail,
            subject: 'Password Reset Request',
            html: `
            <div style="font-family: Arial, sans-serif; margin: auto; padding: 20px; border-radius: 10px; 
                 box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); background: #ffffff;">
                <div>
                    <img src="https://tinyurl.com/mr3u3ah9" alt="HireFlow Logo" 
                         style="width: 100%; max-height: 120px; object-fit: contain;">
                </div>

                <h2 style="color: #333; text-align: center;">Password Reset Request</h2>

                <p style="color: #555; font-size: 16px;">
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

        return { message: "Password reset link sent" };

    } catch (error) {
        throw createError(500, "Internal server error");
    }
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