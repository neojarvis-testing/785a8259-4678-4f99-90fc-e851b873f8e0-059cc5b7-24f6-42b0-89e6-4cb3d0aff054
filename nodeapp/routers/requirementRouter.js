const express = require('express');
const router = express.Router();
const { addRequirement, deleteRequirement, getAllRequirements, getRequirementById, updateRequirement } = require('../controllers/requirementController');
const { validateToken } = require('../authUtils');
const mongoose = require('mongoose');

// Middleware to validate MongoDB ObjectId before using in queries
const validateObjectId = (req, res, next) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid requirement ID format' });
    }
    next();
};

// Apply token validation and object ID validation where applicable
router.get('/getAllRequirements', validateToken, getAllRequirements);
router.get('/getRequirementById/:id', validateToken, validateObjectId, getRequirementById);
router.post('/addRequirement', validateToken, addRequirement);
router.put('/updateRequirement/:id', validateToken, validateObjectId, updateRequirement);
router.delete('/deleteRequirement/:id', validateToken, validateObjectId, deleteRequirement);

module.exports = router;
