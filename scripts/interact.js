// scripts/interact.js
const { ethers } = require("hardhat");
const { getContract } = require("./utils");

async function main() {
    const [user] = await ethers.getSigners();
    const tokenAddress = "YOUR_TOKEN_ADDRESS"; // Replace with your deployed token address
    const fundDistributionAddress = "YOUR_FUND_DISTRIBUTION_ADDRESS"; // Replace with your deployed fund distribution address

    const token = await getContract("PiToken", tokenAddress);
    const fundDistribution = await getContract("FundDistribution", fundDistributionAddress);

    // Mint tokens
    const mintAmount = ethers.utils.parseUnits("100", 18);
    const mintTx = await token.mint(user.address, mintAmount);
    await mintTx.wait();
    console.log(`Minted ${mintAmount.toString()} tokens to ${user.address}`);

    // Request funds
    const requestTx = await fundDistribution.requestFunds(user.address, ethers.utils.parseUnits("50", 18));
    await requestTx.wait();
    console.log(`Requested funds for ${user.address}`);

    // Withdraw funds
    const withdrawTx = await fundDistribution.withdrawFunds(ethers.utils.parseUnits("50", 18));
    await withdrawTx.wait();
    console.log(`Withdrew funds from ${user.address}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
