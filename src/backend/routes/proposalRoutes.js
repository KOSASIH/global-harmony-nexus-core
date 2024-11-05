// routes/proposalRoutes.js
const express = require('express');
const { createProposal, getAllProposals, voteOnProposal, getProposalById } = require('../controllers/proposalController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authenticate, createProposal);
router.get('/', getAllProposals);
router.get('/:proposalId', getProposalById);
router.post('/:proposalId/vote', authenticate, voteOnProposal);

module.exports = router;
