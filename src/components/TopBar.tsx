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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openZerionModal = () => setIsZerionModalOpen(true);
  const closeZerionModal = () => setIsZerionModalOpen(false);

  const handleCheckWallet = () => {
    if (wagmiWalletAddress) {
      setWalletAddress(wagmiWalletAddress);
      openZerionModal();
    } else {
      alert('Please connect your wallet first.');
    }
  };

  return (
    <div className="flex items-center justify-between px-8 w-full">
      <button
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg mr-4"
        onClick={openModal}
      >
        Check Inheritors List (BlockScout)
      </button>
      <button
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg"
        onClick={handleCheckWallet}
      >
        Check Your Crypto Will (Zerion)
      </button>
      <div className="flex justify-end items-start">
        <div className="px-8 py-4">
          <ConnectKitButton />
        </div>
      </div>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
      {isZerionModalOpen && <ZerionPositionsModal isOpen={isZerionModalOpen} onClose={closeZerionModal} walletAddress={walletAddress} />}
    </div>
  );
};

export default TopBar;
