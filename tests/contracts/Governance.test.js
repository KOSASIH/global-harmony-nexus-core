// tests/contracts/Governance.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Governance Contract', function () {
    let Governance;
    let governance;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Governance = await ethers.getContractFactory('Governance');
        governance = await Governance.deploy();
        await governance.deployed();
    });

    it('should deploy the contract', async function () {
        expect(governance.address).to.exist;
    });

    it('should allow owner to create a proposal', async function () {
        await governance.createProposal('Proposal 1', 'Description of Proposal 1');
        const proposal = await governance.proposals(0);
        expect(proposal.title).to.equal('Proposal 1');
    });

    // Add more tests as needed
});
