import React from 'react';
import TokenBalance from '../components/TokenBalance';
import FundRequestForm from '../components/FundRequestForm';

const Home = () => {
    const userAddress = "YOUR_USER_ADDRESS"; // Replace with actual user address logic

    return (
        <div>
            <h1>Welcome to the Advanced DApp</h1>
            <TokenBalance userAddress={userAddress} />
            <FundRequestForm userAddress={userAddress} />
        </div>
    );
};

export default Home;
