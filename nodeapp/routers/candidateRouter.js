const express = require('express');
const router = express.Router();
const { addCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } = require('../controllers/candidateController');
const { validateToken } = require('../authUtils');
router.get('/getAllCandidates', validateToken, getAllCandidates)
router.get('/getCandidateById/:id', validateToken, getCandidateById);
router.post('/addCandidate', validateToken, addCandidate);
router.put('/updateCandidate/:id', validateToken, updateCandidate);
router.delete('/deleteCandidate/:id', validateToken, deleteCandidate);

module.exports = router;