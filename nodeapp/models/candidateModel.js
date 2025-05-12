const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    phone: {
        type: String,
        required: true
    },
    educationalQualification: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    techStack: {
        type: String,
        required: true
    },
    resumeUrl: {
        type: String,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;      