const Candidate = require('../models/candidateModel');

exports.getAllCandidates = async (_req, res) => {
    try {
        const candidates = await Candidate.find();
        res.status(200).json(candidates)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params?.id);
        if(!candidate) {
            return res.status(404).json({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).json(candidate)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addCandidate = async (req, res) => {
    try {
        await Candidate.create(req.body);
        res.status(200).json({ message: `Candidate Added Successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndUpdate(req.params?.id, req.body, { new: true } );
        if(!candidate) {
            return res.status(404).json({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).json({ message: `Success`, candidate })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteCandidate = async (req, res) => {
    try {
        const candidate = await Candidate.findByIdAndDelete(req.params?.id);
        if(!candidate) {
            return res.status(404).json({ message: `Cannot find any Candidate with ID ${req.params?.id}` })
        }
        res.status(200).json({ message: `Candidate Deleted Successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}