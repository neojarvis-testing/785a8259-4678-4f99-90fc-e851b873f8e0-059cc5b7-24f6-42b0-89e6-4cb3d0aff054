const Candidate = require('../models/candidateModel');

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).status(candidates)
    } catch (error) {
        res.status(500).status({ error: error.message });
    }
}

exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params?.id);
        if(!candidate) {
            return res.status(404).status({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).status(candidate)
    } catch (error) {
        res.status(500).status({ error: error.message });
    }
}

exports.addCandidate = async (req, res) => {
    try {
        await Candidate.create(req.body);
        res.status(200).status({ message: `Candidate Added Successfully` })
    } catch (error) {
        res.status(500).status({ error: error.message });
    }
}

exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params?.id, req.body, { new: true } );
        if(!candidate) {
            return res.status(404).status({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).status({ message: `Success`, candidate })
    } catch (error) {
        res.status(500).status({ error: error.message });
    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params?.id);
        if(!candidate) {
            return res.status(404).status({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).status({ message: `Candidate Deleted Successfully` })
    } catch (error) {
        res.status(500).status({ error: error.message });
    }
}