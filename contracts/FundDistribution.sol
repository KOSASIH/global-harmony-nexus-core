// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FundDistribution {
    address[] public signers;
    mapping(address => bool) public isSigner;
    uint public requiredSignatures;
    bool public paused;

    struct FundRequest {
        address recipient;
        uint amount;
        bool fulfilled;
        uint confirmations;
        mapping(address => bool) confirmedBy;
    }

    FundRequest[] public fundRequests;

    event FundRequested(uint requestId, address recipient, uint amount);
    event FundConfirmed(uint requestId, address signer);
    event FundFulfilled(uint requestId, address recipient, uint amount);
    event FundWithdrawn(address recipient, uint amount);
    event EmergencyStop(bool status);

    modifier onlySigner() {
        require(isSigner[msg.sender], "Not an authorized signer");
        _;
    }

    modifier notPaused() {
        require(!paused, "Fund distribution is paused");
        _;
    }

    constructor(address[] memory _signers, uint _requiredSignatures) {
        require(_signers.length > 0, "At least one signer required");
        require(_requiredSignatures > 0 && _requiredSignatures <= _signers.length, "Invalid number of required signatures");

        for (uint i = 0; i < _signers.length; i++) {
            isSigner[_signers[i]] = true;
        }
        signers = _signers;
        requiredSignatures = _requiredSignatures;
        paused = false;
    }

    function requestFunds(address _recipient, uint _amount) public onlySigner notPaused {
        require(_amount > 0, "Amount must be greater than zero");
        FundRequest storage newRequest = fundRequests.push();
        newRequest.recipient = _recipient;
        newRequest.amount = _amount;
        newRequest.fulfilled = false;
        newRequest.confirmations = 0;

        emit FundRequested(fundRequests.length - 1, _recipient, _amount);
    }

    function confirmFundRequest(uint _requestId) public onlySigner notPaused {
        FundRequest storage request = fundRequests[_requestId];
        require(!request.fulfilled, "Request already fulfilled");
        require(!request.confirmedBy[msg.sender], "You have already confirmed this request");

        request.confirmedBy[msg.sender] = true;
        request.confirmations++;

        emit FundConfirmed(_requestId, msg.sender);

        if (request.confirmations >= requiredSignatures) {
            fulfillFundRequest(_requestId);
        }
    }

    function fulfillFundRequest(uint _requestId) internal {
        FundRequest storage request = fundRequests[_requestId];
        require(!request.fulfilled, "Request already fulfilled");
        require(request.confirmations >= requiredSignatures, "Not enough confirmations");

        request.fulfilled = true;
        payable(request.recipient).transfer(request.amount);

        emit FundFulfilled(_requestId, request.recipient, request.amount);
    }

    function withdrawFunds(uint _amount) public {
        require(_amount > 0, "Amount must be greater than zero");
        require(address(this).balance >= _amount, "Insufficient contract balance");

        payable(msg.sender).transfer(_amount);
        emit FundWithdrawn(msg.sender, _amount);
    }

    function pauseDistribution() public onlySigner {
        paused = true;
        emit EmergencyStop(true);
    }

    function resumeDistribution() public onlySigner {
        paused = false;
        emit EmergencyStop(false);
    }

    // Fallback function to receive Ether
    receive() external payable {}
}
