import React, { useState } from 'react';
import Modal from './BlockScoutModal'; // Adjust the path as necessary

const TopBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-between px-8 w-full">
      <div className="text-white font-bold text-2xl">
        NFT <span className="text-purple-400">SEA</span>
      </div>
      <button
        className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg"
        onClick={openModal}
      >
        Check Wallet
      </button>
      <button className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg">
        Explore Marketplace
      </button>
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default TopBar;
