import { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';
import { arbitrumSepolia, lineaTestnet } from 'wagmi/chains';
import { incoNetwork, zircuitTestnet } from '@/components/wrappers/Web3Provider';

const useMintNFT = ( abi: any) => {
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintError, setMintError] = useState<string | null>(null);
  const { chainId } = useAccount();

  const contractAddress = {
    [arbitrumSepolia.id]: '0xbE53a6f6aAE6EE4baEf82bF11db148e8611CfeD1',
    [lineaTestnet.id]: '0xCC03f54E4A9D73331B9bC1cAc192cF89BB957472',
    [incoNetwork.id]: '0xbA972364da5beB6A58d6144258dBB30F823d4eE6', 
    [zircuitTestnet.id]: '0x1d26E3356Bcb6E69c9B7558cc265DCFa5b11eC22',
  }[chainId || 1];


  const mintNFT = async (recipientAddress: string, metadataURI: string, signer: ethers.Signer) => {
    setMintError(null);

    try {
      setIsMinting(true);
      const contract = new ethers.Contract(contractAddress!, abi, signer);
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
