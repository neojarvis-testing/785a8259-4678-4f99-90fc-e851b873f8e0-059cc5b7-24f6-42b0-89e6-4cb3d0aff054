const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Requirement = mongoose.model('Requirement', requirementSchema);

module.exports = Requirement;