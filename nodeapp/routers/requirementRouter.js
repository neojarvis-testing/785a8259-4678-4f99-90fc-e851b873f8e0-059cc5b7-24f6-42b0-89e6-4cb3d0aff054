const express = require('express');
const router = express.Router();
const { addRequirement, deleteRequirement, getAllRequirements, getRequirementById, updateRequirement } = require('../controllers/requirementController');

router.get('/getAllRequirements', getAllRequirements)
router.get('/getRequirementById/:id', getRequirementById);
router.post('/addRequirement', addRequirement);
router.put('/updateRequirement/:id', updateRequirement);
router.delete('/deleteRequirement/:id', deleteRequirement);

module.exports = router;