// services/proposalService.js
const Proposal = require('../models/Proposal');

exports.createProposal = async (title, description, creatorId) => {
    const newProposal = new Proposal({ title, description, creator: creatorId });
    return await newProposal.save();
};

exports.getAllProposals = async () => {
    return await Proposal.find().populate('creator', 'username');
};

exports.getProposalById = async (proposalId) => {
    return await Proposal.findById(proposalId).populate('creator', 'username');
};

exports.voteOnProposal = async (proposalId) => {
    const proposal = await Proposal.findById(proposalId);
    if (!proposal) throw new Error('Proposal not found');
    proposal.votes += 1;
    return await proposal.save();
};
