const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const Requirement = require('../models/requirementModel');

exports.getAllRequirements = async (req, res) => {
    try {
        const requiremnets = await Requirement.find();
        res.status(200).json(requiremnets)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getRequirementById = async (req, res) => {
    try {
        const requiremnet = await Requirement.findById(req.params?.id);
        if(!requiremnet) {
            return res.status(404).json({ message: `Cannot find any Requirement with ID ${req.params?.id}` })
        }
        res.status(200).json(requiremnet)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// exports.addRequirement = async (req, res) => {
//     try {
//         const { title, description, department } = req.body;

//         if (!validator.isAlphanumeric(title.replace(/\s/g, ''))) {
//             return res.status(400).json({ message: "Invalid title format" });
//         }
//         if (!validator.isLength(description, { min: 2 })) {
//             return res.status(400).json({ message: "Description must be at least 2 characters long" });
//         }
//         if (!validator.isAlpha(department.replace(/\s/g, ''))) {
//             return res.status(400).json({ message: "Invalid department format" });
//         }

//         const postedDate = new Date();
//         const status = 'Active';

//         const requirement = await Requirement.create({
//             title: sanitizeHtml(title), description: sanitizeHtml(description), department: sanitizeHtml(department), postedDate: sanitizeHtml(postedDate), status: sanitizeHtml(status)
//         });

//         res.status(200).json({ message: "Requirement Added Successfully", requirement });

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const Requirement = require('../models/requirementModel');

// Centralized input sanitization function
const sanitizeInput = (input) => sanitizeHtml(input.trim());

exports.addRequirement = async (req, res) => {
    try {
        const { title, description, department } = req.body;

        // Validate user inputs before processing
        if (!validator.isAlphanumeric(title.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid title format" });
        }
        if (!validator.isLength(description, { min: 2 })) {
            return res.status(400).json({ message: "Description must be at least 2 characters long" });
        }
        if (!validator.isAlpha(department.replace(/\s/g, ''))) {
            return res.status(400).json({ message: "Invalid department format" });
        }

        const postedDate = new Date();
        const status = 'Active';

        // Securely create requirement using sanitized data
        const sanitizedRequirement = {
            title: sanitizeInput(title),
            description: sanitizeInput(description),
            department: sanitizeInput(department),
            postedDate: postedDate, // Date is already safe, no need to sanitize
            status: status // Status is predefined, no need to sanitize
        };

        const requirement = new Requirement(sanitizedRequirement);
        await requirement.save();

        res.status(201).json({ message: "Requirement Added Successfully", requirement });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


exports.updateRequirement = async (req, res) => {
    try {
        const requiremnet = await Requirement.findByIdAndUpdate(req.params?.id, req.body, { new: true } );
        if(!requiremnet) {
            return res.status(404).json({ message: `Cannot find any Requirement with ID ${req.params?.id}` })
        }
        res.status(200).json({ message: `Success`, requiremnet })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.deleteRequirement = async (req, res) => {
    try {
        const requiremnet = await Requirement.findByIdAndDelete(req.params?.id);
        if(!requiremnet) {
            return res.status(404).json({ message: `Cannot find any Requirement with ID ${req.params?.id}` })
        }
        res.status(200).json({ message: `Requirement Deleted Successfully` })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}