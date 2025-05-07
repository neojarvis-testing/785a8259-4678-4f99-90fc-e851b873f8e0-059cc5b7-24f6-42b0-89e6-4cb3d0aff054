const express = require('express');
const router = express.Router();
const { addCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } = require('../controllers/candidateController');

router.get('/getAllCandidates', getAllCandidates)
router.get('/getCandidateById/:id', getCandidateById);
router.post('/addCandidate', addCandidate);
router.put('/updateCandidate/:id', updateCandidate);
router.delete('/deleteCandidate/:id', deleteCandidate);

module.exports = router;