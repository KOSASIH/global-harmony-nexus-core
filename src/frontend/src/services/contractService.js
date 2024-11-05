import { ethers } from 'ethers';
import TokenArtifact from '../artifacts/contracts/PiToken.sol/PiToken.json'; // Adjust path as necessary
import FundDistributionArtifact from '../artifacts/contracts/FundDistribution.sol/FundDistribution.json'; // Adjust path as necessary

// Set up the provider and signer
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// Replace with your deployed contract addresses
const tokenAddress = "YOUR_TOKEN_ADDRESS"; // Replace with your deployed token address
const fundDistributionAddress = "YOUR_FUND_DISTRIBUTION_ADDRESS"; // Replace with your deployed fund distribution address

// Function to get the token balance of a user
export const getTokenBalance = async (userAddress) => {
    try {
        const tokenContract = new ethers.Contract(tokenAddress, TokenArtifact.abi, signer);
        const balance = await tokenContract.balanceOf(userAddress);
        return ethers.utils.formatUnits(balance, 18); // Adjust decimals as necessary
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw new Error('Could not fetch token balance');
    }
};

// Function to request funds
export const requestFunds = async (userAddress, amount) => {
    try {
        const fundDistributionContract = new ethers.Contract(fundDistributionAddress, FundDistributionArtifact.abi, signer);
        const tx = await fundDistributionContract.requestFunds(userAddress, ethers.utils.parseUnits(amount, 18));
        await tx.wait(); // Wait for the transaction to be mined
        return tx; // Return the transaction object
    } catch (error) {
        console.error('Error requesting funds:', error);
        throw new Error('Could not request funds');
    }
};

// Function to get all proposals (example)
export const getProposals = async () => {
    try {
        const fundDistributionContract = new ethers.Contract(fundDistributionAddress, FundDistributionArtifact.abi, signer);
        const proposals = await fundDistributionContract.getProposals(); // Assuming this function exists in your contract
        return proposals;
    } catch (error) {
        console.error('Error fetching proposals:', error);
        throw new Error('Could not fetch proposals');
    }
};

// Function to vote on a proposal
export const voteOnProposal = async (proposalId, vote) => {
    try {
        const fundDistributionContract = new ethers.Contract(fundDistributionAddress, FundDistributionArtifact.abi, signer);
        const tx = await fundDistributionContract.vote(proposalId, vote); // Assuming this function exists in your contract
        await tx.wait(); // Wait for the transaction to be mined
        return tx; // Return the transaction object
    } catch (error) {
        console.error('Error voting on proposal:', error);
        throw new Error('Could not vote on proposal');
    }
};

// Function to get the voting results (example)
export const getVotingResults = async (proposalId) => {
    try {
        const fundDistributionContract = new ethers.Contract(fundDistributionAddress, FundDistributionArtifact.abi, signer);
        const results = await fundDistributionContract.getVotingResults(proposalId); // Assuming this function exists in your contract
        return results;
    } catch (error) {
        console.error('Error fetching voting results:', error);
        throw new Error('Could not fetch voting results');
    }
};

// Add more contract interaction functions as needed
