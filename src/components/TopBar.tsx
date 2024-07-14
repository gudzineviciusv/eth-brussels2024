import React, { useState } from 'react';
import Modal from './BlockScoutModal';
import ZerionPositionsModal from './ZerionPositionsModal';
import { ConnectKitButton } from 'connectkit';
import { useAccount } from 'wagmi';

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isZerionModalOpen, setIsZerionModalOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const { address: wagmiWalletAddress } = useAccount();


  const handleCheckWallet = () => {
    if (wagmiWalletAddress) {
      setWalletAddress(wagmiWalletAddress);
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <div className="flex items-center justify-between px-8 w-full">
      <div className="flex justify-end items-start">
        <div className="px-8 py-4">
          <ConnectKitButton />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
