//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Exploit {
    address payable public owner;

    constructor() {
        owner = payable(msg.sender);
    }

    fallback() external  {
        owner.transfer(address(this).balance);
    }
}