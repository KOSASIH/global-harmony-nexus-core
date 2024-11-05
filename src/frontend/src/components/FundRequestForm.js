import React, { useState } from 'react';
import { requestFunds } from '../services/contractService';

const FundRequestForm = ({ userAddress }) => {
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await requestFunds(userAddress, amount);
            alert('Funds requested successfully!');
            setAmount('');
        } catch (error) {
            console.error('Error requesting funds:', error);
            alert('Failed to request funds.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Request Funds</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <button type="submit">Request</button>
        </form>
    );
};

export default FundRequestForm;
