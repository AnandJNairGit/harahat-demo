// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract BuyMeACoffee {
    // Define a struct for Funder information
    struct FunderInfo {
        string name; // name of the funder
        string message; // message from the funder
        uint256 timestamp; // time when the funding took place
        address funderAddress; // address of the funder
    }

    // Array of funders
    FunderInfo[] funders;

    // Owner of the contract
    address payable owner;

    // Constructor to set the owner
    constructor() {
        owner = payable(msg.sender);
    }

    // Modifier to check if enough value is sent with the transaction
    modifier hasEnoughFund() {
        require(msg.value > 0, "Not enough value sent");
        _;
    }

    // Function to buy a coffee and store the funder information
    function buyCoffee(
        string memory _name,
        string memory _message
    ) public payable hasEnoughFund {
        // Transfer the value to the owner
        owner.transfer(msg.value);

        // Create a memory object of type FunderInfo
        FunderInfo memory funder = FunderInfo({
            name: _name,
            message: _message,
            timestamp: block.timestamp,
            funderAddress: msg.sender
        });

        // Add the funder to the array of funders
        funders.push(funder);
    }

    // Function to retrieve all the funders
    function getFunders() public view returns (FunderInfo[] memory) {
        // Return the array of funders
        return funders;
    }
}
