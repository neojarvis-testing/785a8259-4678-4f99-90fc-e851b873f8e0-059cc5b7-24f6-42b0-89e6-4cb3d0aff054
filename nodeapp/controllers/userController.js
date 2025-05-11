const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateToken } = require('../authUtils')
const transport=require('../mailTransport');
const jwt=require('jsonwebtoken')
require('dotenv').config();
const {resetToken}=require('../authUtils')
const createError=require('http-errors')
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
        const { userName, email, mobile, password, role } = req.body; 
        // const hashedPassword = await bcrypt.hash(password, 10);
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
}
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
exports.forgotPassword=async (email)=>{
    const user=await User.findOne({email});
    if(!user) throw createError(404, `No user found with EMAIL ID: ${email}`);
    const payload={
        id:user._id.toString(),
        name:user.name,
        email:user.email,
        role:user.role
    }
    const token=resetToken(payload);
    user.resetToken=token;
    user.resetTokenExpiry=Date.now()+15*60*1000;
    await user.save();
    await transport.sendMail({
        from: `"HireFlow" <${process.env.EMAIL_USER}`,
        to: email,
        subject: 'Password Reset Request',
        html:`
        <h1>Password Request</h1>
        <section>
            <p><strong>Important !!! User ${user.name}</strong></p>
            <p>Attention User! this is to inform you that, you have requested for a password change,if you didnt requested for the password change kindly ignore this message.</p>
            <a href="${process.env.CLIENT_URL}/resetPassword/${token}" style="background-color: blue; cursor:pointer; border: 1px;display: inline-block;color:white;padding:2px;">
                Reset Password
            </a>
        </section>
        `
    });
    return {message: 'Password reset link sent'}
};
exports.resetPassword = async (resetToken, newPassword) => {
    const decoded= jwt.verify(resetToken, process.env.SECRET_KEY);
    const user=await User.findById(decoded.id)
    if (!user) throw createError(400, 'Invalid token');
    if (Date.now() > user.resetTokenExpiry) throw createError(400, 'Token expired');
    user.password = newPassword;
    user.resetToken = undefined;
    await user.save();  return { message: 'Password reset successful!' };
    
};


