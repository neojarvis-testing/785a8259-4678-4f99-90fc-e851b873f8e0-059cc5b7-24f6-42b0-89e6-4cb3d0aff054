const jwt = require('jsonwebtoken')

exports.generateToken = (userId) => jwt.sign(userId, SECRET_KEY, { expiresIn: '1h' })

exports.validateToken = (req, res, next) => {
    try {
        const authHeader = req.header.authorization
        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(400).json({ message: "Authentication failed" })
        }
        const token = authHeader.subString(7)
        jwt.verify(token, SECRET_KEY);
        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}