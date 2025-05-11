const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.generateToken = (userId) => jwt.sign({userId}, process.env.SECRET_KEY, { expiresIn: '1h' })

exports.validateToken = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(400).json({ message: "Authentication failed" })
        }
        const token = authHeader.substring(7)
        jwt.verify(token, process.env.SECRET_KEY);
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.resetToken=(payload)=>jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '15m'});