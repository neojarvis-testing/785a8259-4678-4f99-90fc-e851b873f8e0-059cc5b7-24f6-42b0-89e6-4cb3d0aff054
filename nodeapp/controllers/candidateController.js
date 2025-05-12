const validator = require('validator');
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

        if (!name || !validator.isAlpha(name.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid name format" });
        }
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!phone || !validator.isMobilePhone(phone, 'any')) {
            return res.status(400).json({ message: "Invalid phone number format" });
        }
        if (!resumeUrl || !validator.isURL(resumeUrl)) {
            return res.status(400).json({ message: "Invalid resume URL format" });
        }
        if (applicationDate && !validator.isDate(applicationDate)) {
            return res.status(400).json({ message: "Invalid application date format" });
        }

        await Candidate.create({
            name, email, phone, educationalQualification, experience, techStack, resumeUrl, applicationDate, status
        });

        res.status(200).json({ message: "Candidate Added Successfully" });

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