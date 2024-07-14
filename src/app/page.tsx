"use client";

import React, { useState } from 'react';
import BackgroundComponent from '@/components/wrappers/BackgroundWrapper';
import Header from '@/components/Header';
import MintNFTForm from '@/components/Form/MainForm';
import Footer from '@/components/Footer';
import CryptoWillButton from '@/components/CryptoWillButton';
import InheritorsListButton from '@/components/InheritorsListButton';
import Modal from '@/components/BlockScoutModal';
import ZerionPositionsModal from '@/components/ZerionPositionsModal';
import { useAccount } from 'wagmi';

import cryptoWillImage from '/public/assets/crypto-will-image.png';
import inheritorsListImage from '/public/assets/inheritors-list-image.png';

const HomePage: React.FC = () => {
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
        <BackgroundComponent>
            <Header title={'Leave your crypto legacy'} subtitle={'tbd'} />
            <div className="flex justify-between items-start">
                <button className="image-button" onClick={handleCheckWallet}>
                    <img src={cryptoWillImage.src} alt="Crypto Will" style={{ width: '250px', height: 'auto' }} />
                </button>

                <div className="w-full md:w-3/4 lg:w-1/2 px-20 py-8">
                    <MintNFTForm />
                </div>

                <button className="image-button" onClick={openModal}>
                    <img src={inheritorsListImage.src} alt="Inheritors List" style={{ width: '130px', height: 'auto' }} />
                </button>
            </div>

            {/* Modals */}
            {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} />}
            {isZerionModalOpen && <ZerionPositionsModal isOpen={isZerionModalOpen} onClose={closeZerionModal} walletAddress={walletAddress} />}

            <Footer />
        </BackgroundComponent>
    );
}

export default HomePage;
