// tests/contracts/FundDistribution.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('FundDistribution Contract', function () {
    let FundDistribution;
    let fundDistribution;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        FundDistribution = await ethers.getContractFactory('FundDistribution');
        fundDistribution = await FundDistribution.deploy();
        await fundDistribution.deployed();
    });

    it('should deploy the contract', async function () {
        expect(fundDistribution.address).to.exist;
    });

    it('should distribute funds correctly', async function () {
        await fundDistribution.distribute(addr1.address, ethers.utils.parseEther('1.0'));
        const balance = await ethers.provider.getBalance(addr1.address);
        expect(balance).to.be.above(0);
    });

    // Add more tests as needed
});
