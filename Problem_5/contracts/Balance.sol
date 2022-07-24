// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.15;

interface IERC20 {
    function balanceOf(address) external view returns (uint);
}

contract Balance {
    struct BalStruct {
        address token;
        uint amount;
    }

    function getBalances(address user, address[] memory tokens) public view returns (BalStruct[] memory) {
        BalStruct[] memory balArr = new BalStruct[](tokens.length);

        for (uint i = 0; i < tokens.length; i++) {
            uint userBalance = IERC20(tokens[i]).balanceOf(user);
            balArr[i] = BalStruct(tokens[i], userBalance);
        }
        return balArr;
    }
}