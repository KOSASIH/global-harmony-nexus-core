// scripts/utils.js
const { ethers } = require("hardhat");
const axios = require("axios");

async function verifyContract(contractAddress) {
    const { chainId } = await ethers.provider.getNetwork();
    const etherscanApiKey = process.env.ETHERSCAN_API_KEY; // Set your Etherscan API key in .env
    const etherscanUrl = `https://api${chainId === 1 ? '' : '-' + chainId}.etherscan.io/api`;

    const response = await axios.post(etherscanUrl, {
        module: "contract",
        action: "verify",
        apiKey: etherscanApiKey,
        contractAddress: contractAddress,
        sourceCode: await getContractSourceCode(contractAddress),
        // Add other required parameters for verification
    });

    if (response.data.status === "1") {
        console.log(`Contract verified: ${contractAddress}`);
    } else {
        console.error(`Verification failed: ${response.data.result}`);
    }
}

async function getContractSourceCode(contractAddress) {
    // Logic to retrieve the source code of the contract
    // This can be done using Hardhat's artifacts or other methods
    return "YOUR_CONTRACT_SOURCE_CODE"; // Replace with actual source code retrieval logic
}

async function getContract(contractName, contractAddress) {
