import { useState } from 'react';
import { ethers } from 'ethers';

const useMintNFT = (contractAddress: string, abi: any) => {
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintError, setMintError] = useState<string | null>(null);

  const mintNFT = async (recipientAddress: string, metadataURI: string, signer: ethers.Signer) => {
    setMintError(null);

    try {
      setIsMinting(true);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      const transaction = await contract.mint(recipientAddress, metadataURI);
      await transaction.wait();

      setIsMinting(false);
      console.log('NFT minted:', transaction.hash);
      return transaction.hash;
    } catch (error: any) {
      setIsMinting(false);
      setMintError(error.message);
      console.error('Error minting NFT:', error);
      return null; 
    }
  };

  return { mintNFT, isMinting, mintError };
};

export default useMintNFT;
