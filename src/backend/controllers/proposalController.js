// controllers/proposalController.js
const Proposal = require('../models/Proposal');

// Create a new proposal
exports.createProposal = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newProposal = new Proposal({
            title,
            description,
            creator: req.user.id,
        });
        await newProposal.save();
        res.status(201).json(newProposal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating proposal', error });
    }
};

// Get all proposals
exports.getAllProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find().populate('creator', 'username');
        res.json(proposals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposals', error });
    }
};

// Vote on a proposal
exports.voteOnProposal = async (req, res) => {
    const { proposalId } = req.params;

    try {
        const proposal = await Proposal.findById(proposalId);
        if (!proposal) return res.status(404).json({ message: 'Proposal not found' });

        proposal.votes += 1; // Increment the vote count
        await proposal.save();
        res.json({ message: 'Vote recorded', proposal });
    } catch (error) {
        res.status(500).json({ message: 'Error voting on proposal', error });
    }
};

// Get a specific proposal
exports.getProposalById = async (req, res) => {
    const { proposalId } = req.params;

    try {
        const proposal = await Proposal.findById(proposalId).populate('creator', 'username');
        if (!proposal) return res.status(404).json({ message: 'Proposal not found' });
        res.json(proposal);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposal', error });
    }
};
