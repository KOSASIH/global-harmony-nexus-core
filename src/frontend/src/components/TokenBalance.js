import React, { useEffect, useState } from 'react';
import { getTokenBalance } from '../services/contractService';

const TokenBalance = ({ userAddress }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const fetchBalance = async () => {
            const balance = await getTokenBalance(userAddress);
            setBalance(balance);
        };
        fetchBalance();
    }, [userAddress]);

    return (
        <div>
            <h2>Your Token Balance: {balance}</h2>
        </div>
    );
};

export default TokenBalance;
