import React, { useState } from 'react';
import Modal from './BlockScoutModal'; // Adjust the path as necessary
import { ConnectKitButton } from 'connectkit';

const TopBar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex items-center justify-between px-8 w-full">
            <button
                className="bg-gradient-to-r from-blue-500 to-pink-500 text-white px-4 py-2 rounded-lg"
                onClick={openModal}
            >
                Check Wallet
            </button>
            <div className="flex justify-end items-start">
                <div className="px-8 py-4">
                    <ConnectKitButton />
                </div>
            </div>
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
        </div>
    );
};

export default TopBar;
