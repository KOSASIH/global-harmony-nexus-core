// tests/contracts/Token.test.js
const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', function () {
    let Token;
    let token;
    let owner;
    let addr1;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();
        Token = await ethers.getContractFactory('Token');
        token = await Token.deploy('MyToken', 'MTK', 1000);
        await token.deployed();
    });

    it('should deploy the contract', async function () {
        expect(token.address).to.exist;
    });

    it('should have the correct name and symbol', async function () {
        expect(await token.name()).to.equal('MyToken');
        expect(await token.symbol()).to.equal('MTK');
    });

    it('should transfer tokens correctly', async function () {
        await token.transfer(addr1.address, 100);
        const addr1Balance = await token.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(100);
    });

    // Add more tests as needed
});
