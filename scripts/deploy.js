// scripts/deploy.js
const { ethers, upgrades } = require("hardhat");
const { verifyContract } = require("./utils");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy Token
    const Token = await ethers.getContractFactory("PiToken");
    const token = await upgrades.deployProxy(Token, [ethers.utils.parseUnits("1000000", 18), deployer.address, 2], { initializer: 'initialize' });
    await token.deployed();
    console.log("Token deployed to:", token.address);

    // Deploy FundDistribution
    const FundDistribution = await ethers.getContractFactory("FundDistribution");
    const fundDistribution = await FundDistribution.deploy([deployer.address], 1);
    await fundDistribution.deployed();
    console.log("FundDistribution deployed to:", fundDistribution.address);

    // Verify contracts on Etherscan
    await verifyContract(token.address);
    await verifyContract(fundDistribution.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
