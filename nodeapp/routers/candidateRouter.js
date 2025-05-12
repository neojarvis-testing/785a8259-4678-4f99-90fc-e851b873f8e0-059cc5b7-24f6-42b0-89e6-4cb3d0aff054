// const express = require('express');
// const router = express.Router();
// const { addCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } = require('../controllers/candidateController');
// const { validateToken } = require('../authUtils');
// router.get('/getAllCandidates', validateToken, getAllCandidates)
// router.get('/getCandidateById/:id', validateToken, getCandidateById);
// router.post('/addCandidate', validateToken, addCandidate);
// router.put('/updateCandidate/:id', validateToken, updateCandidate);
// router.delete('/deleteCandidate/:id', validateToken, deleteCandidate);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { addCandidate, deleteCandidate, getAllCandidates, getCandidateById, updateCandidate } = require('../controllers/candidateController');
const { validateToken } = require('../authUtils');

// Ensure IDs are validated before passing to controllers
const validateId = (req, res, next) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Invalid candidate ID' });
    }
    next();
};

router.get('/getAllCandidates', validateToken, getAllCandidates);
router.get('/getCandidateById/:id', validateToken, validateId, getCandidateById);
router.post('/addCandidate', validateToken, addCandidate);
router.put('/updateCandidate/:id', validateToken, validateId, updateCandidate);
router.delete('/deleteCandidate/:id', validateToken, validateId, deleteCandidate);

module.exports = router;
