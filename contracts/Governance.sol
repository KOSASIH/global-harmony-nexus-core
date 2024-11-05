// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Governance {
    struct Proposal {
        uint id;
        string description;
        uint voteCount;
        uint creationTime;
        uint votingEndTime;
        mapping(address => bool) voters;
        bool executed;
        bool canceled;
    }

    mapping(uint => Proposal) public proposals;
    uint public proposalCount;
    address public owner;
    uint public quorum; // Minimum votes required to execute a proposal
    uint public votingPeriod; // Duration for which voting is allowed

    event ProposalCreated(uint id, string description, uint votingEndTime);
    event Voted(uint proposalId, address voter);
    event ProposalExecuted(uint proposalId);
    event ProposalCanceled(uint proposalId);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyActiveProposal(uint _proposalId) {
        require(!proposals[_proposalId].executed, "Proposal already executed");
        require(!proposals[_proposalId].canceled, "Proposal has been canceled");
        require(block.timestamp < proposals[_proposalId].votingEndTime, "Voting period has ended");
        _;
    }

    constructor(uint _quorum, uint _votingPeriod) {
        owner = msg.sender;
        quorum = _quorum;
        votingPeriod = _votingPeriod;
    }

    function createProposal(string memory _description) public onlyOwner {
        proposalCount++;
        Proposal storage newProposal = proposals[proposalCount];
        newProposal.id = proposalCount;
        newProposal.description = _description;
        newProposal.voteCount = 0;
        newProposal.executed = false;
        newProposal.canceled = false;
        newProposal.creationTime = block.timestamp;
        newProposal.votingEndTime = block.timestamp + votingPeriod;

        emit ProposalCreated(proposalCount, _description, newProposal.votingEndTime);
    }

    function vote(uint _proposalId) public onlyActiveProposal(_proposalId) {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.voters[msg.sender], "You have already voted");

        proposal.voters[msg.sender] = true;
        proposal.voteCount++;

        emit Voted(_proposalId, msg.sender);
    }

    function executeProposal(uint _proposalId) public onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(proposal.voteCount >= quorum, "Not enough votes to execute proposal");

        proposal.executed = true;

        emit ProposalExecuted(_proposalId);
        // Logic to execute the proposal can be added here
    }

    function cancelProposal(uint _proposalId) public onlyOwner {
        Proposal storage proposal = proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(!proposal.canceled, "Proposal already canceled");

        proposal.canceled = true;

        emit ProposalCanceled(_proposalId);
    }

    function getProposalDetails(uint _proposalId) public view returns (
        uint id,
        string memory description,
        uint voteCount,
        uint creationTime,
        uint votingEndTime,
        bool executed,
        bool canceled
    ) {
        Proposal storage proposal = proposals[_proposalId];
        return (
            proposal.id,
            proposal.description,
            proposal.voteCount,
            proposal.creationTime,
            proposal.votingEndTime,
            proposal.executed,
            proposal.canceled
        );
    }
}
