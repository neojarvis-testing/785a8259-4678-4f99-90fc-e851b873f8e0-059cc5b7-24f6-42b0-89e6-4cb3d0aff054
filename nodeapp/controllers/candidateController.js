const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
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
        const { name, email, phone, educationalQualification, experience, techStack, resumeUrl, applicationDate, status } = req.body;

        const sanitizedCandidate = {
            name: sanitizeHtml(name),
            email: sanitizeHtml(email),
            phone: sanitizeHtml(phone),
            educationalQualification: sanitizeHtml(educationalQualification),
            experience: sanitizeHtml(experience),
            techStack: sanitizeHtml(techStack),
            resumeUrl,
            applicationDate,
            status
        };

        const candidate = new Candidate(sanitizedCandidate);
        await candidate.save();

        res.status(201).json({ message: 'Candidate Added Successfully', candidate });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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