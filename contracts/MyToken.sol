// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    constructor() ERC721("MyToken", "MTK") {}

    function _baseURI() internal pure override returns (string memory) {
        
        return "https://www.megavoxels.com/wp-content/uploads/2023/07/Pixel-Art-Dog-2-1006x1024.jpeg";
    }
}
