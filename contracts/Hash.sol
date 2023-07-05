
pragma solidity ^0.8.0;

contract Hash {
    mapping(string => uint256) public stringToIntegerMapping;

    function setInteger(string memory key, uint256 value) public {
        stringToIntegerMapping[key] = value;
    }

    function getInteger(string memory key) public view returns (uint256) {
        return stringToIntegerMapping[key];
    }
}

