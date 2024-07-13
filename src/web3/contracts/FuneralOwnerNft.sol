// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FuneralOwnerNft is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    event NFTMinted(address indexed recipient, uint256 indexed tokenId, string tokenURI);

    constructor() ERC721("SimpleNFT", "SNFT") Ownable(msg.sender) {
        _tokenIdCounter = 1;
    }

    function mint(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = _tokenIdCounter;
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        _tokenIdCounter++;

        emit NFTMinted(recipient, newTokenId, tokenURI);

        return newTokenId;
    }
}
