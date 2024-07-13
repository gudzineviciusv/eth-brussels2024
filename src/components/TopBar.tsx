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
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal}/>}
            {/*<div className="flex justify-end items-start px-8 py-4 w-full fixed top-0 right-0">*/}
            {/*    <ConnectKitButton/>*/}
            {/*</div>*/}
        </div>
    );
};

export default TopBar;
