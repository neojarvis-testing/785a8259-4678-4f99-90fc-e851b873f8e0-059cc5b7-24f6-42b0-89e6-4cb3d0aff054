const express = require('express');
const router = express.Router();
const { addRequirement, deleteRequirement, getAllRequirements, getRequirementById, updateRequirement } = require('../controllers/requirementController');
const { validateToken } = require('../authUtils');

router.get('/getAllRequirements',validateToken, getAllRequirements)
router.get('/getRequirementById/:id', validateToken, getRequirementById);
router.post('/addRequirement', validateToken, addRequirement);
router.put('/updateRequirement/:id', validateToken,  updateRequirement);
router.delete('/deleteRequirement/:id', validateToken, deleteRequirement);

module.exports = router;